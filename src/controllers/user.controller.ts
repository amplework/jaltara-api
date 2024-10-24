import {authenticate} from '@loopback/authentication';
import {inject, service} from '@loopback/core';
import {Filter, FilterExcludingWhere, repository} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import _ from 'lodash';
import {PasswordHasherBindings, TokenServiceBindings} from '../keys';
import {User} from '../models';
import {UserCodeRepository, UserRepository} from '../repositories';
import {PasswordHasher} from '../services/hash.password.bcryptjs';
import {TokenService} from '../services/jwt-service';
import {MyUserService} from '../services/user-service';
import {NewUserResponse, UserProfileSchema} from '../utils/type-schema';

export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,

    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,

    @repository(UserRepository)
    public userRepository: UserRepository,

    @repository(UserCodeRepository)
    public userCodeRepository: UserCodeRepository,

    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,

    @service(MyUserService) public userService: MyUserService,
  ) {}

  @post('/users')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async checkUser(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<any> {
    const phoneExists = await this.userRepository.findOne({
      where: {
        phone: user.phone,
      },
    });
    if (phoneExists) {
      this.userRepository.userCredential(phoneExists.id);

      const userProfile = await this.userService.getUserProfile(phoneExists);
      const token = await this.jwtService.generateToken(userProfile);

      const result: NewUserResponse = _.extend({}, phoneExists, {
        token,
      });

      return {
        statusCode: 200,
        message: 'Authentication successful',
        data: {
          id: result.id,
          name: result.name,
          token: token,
        },
      };
    }

    const savedUser = await this.userRepository.create(
      _.omit(user, ['password']),
    );

    if (!savedUser) {
      throw new HttpErrors.BadRequest('Error in creating new User!');
    }

    this.userRepository.userCredential(savedUser.id);

    const userProfile = await this.userService.getUserProfile(savedUser);
    const token = await this.jwtService.generateToken(userProfile);

    const result: NewUserResponse = _.extend({}, savedUser, {
      token,
    });

    return {
      statusCode: 200,
      message: 'User added successfully.',
      data: result,
    };
  }

  @get('/user/me', {
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: UserProfileSchema,
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async whoAmI(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<any> {
    const userId = currentUserProfile[securityId];
    const user = await this.userRepository.findById(userId);
    return {
      statusCode: 200,
      message: 'User profile',
      data: user,
    };
  }

  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(User) filter?: Filter<User>): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>,
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  @authenticate('jwt')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @inject(SecurityBindings.USER) currentUserProfile: UserProfile,
  ): Promise<any> {
    const {user_id} = currentUserProfile;

    const userExists = await this.userRepository.findById(user_id);
    if (!userExists) {
      throw new HttpErrors.NotFound('User account not found');
    }
    await this.userRepository.updateById(id, user);
  }

  @put('/users/{id}')
  @response(204, {
    description: 'User PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
