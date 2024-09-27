import {authenticate} from '@loopback/authentication';
import {OPERATION_SECURITY_SPEC} from '@loopback/authentication-jwt';
import {inject, service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
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
import {SecurityBindings, UserProfile} from '@loopback/security';
import _ from 'lodash';
import {PasswordHasherBindings, TokenServiceBindings} from '../keys';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {PasswordHasher} from '../services/hash.password.bcryptjs';
import {TokenService} from '../services/jwt-service';
import {MyUserService} from '../services/user-service';
import {validatePassword} from '../services/validator';
import {
  ChangePassword,
  Credentials,
  CredentialsRequestBody,
  NewUserResponse,
  PasswordChangeRequestBody,
  UserProfileSchema,
} from '../utils/type-schema';

export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,

    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,

    @repository(UserRepository)
    public userRepository: UserRepository,

    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,

    @service(MyUserService) public userService: MyUserService,
  ) {}

  @post('/users')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
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
    const hashedPassword = await this.passwordHasher.hashPassword(
      user.password,
    );

    const emailExists = await this.userRepository.count({
      email: user.email,
    });
    if (emailExists?.count) {
      throw new HttpErrors.Conflict('Email already registered');
    }

    const phoneExists = await this.userRepository.count({
      phone: user.phone,
    });
    if (phoneExists?.count) {
      throw new HttpErrors.Conflict('Phone already registered');
    }

    try {
      const savedUser = await this.userRepository.create(
        _.omit(user, ['password']),
      );

      if (!savedUser) {
        throw new HttpErrors.BadRequest('Error in creating new User!');
      }

      await this.userRepository
        .userCredential(savedUser.id)
        .create({password: hashedPassword});

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
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  @post('/auth/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<any> {
    const user = await this.userService.verifyCredentials(credentials);
    const userProfile = await this.userService.getUserProfile(user);
    const token = await this.jwtService.generateToken(userProfile);
    return {
      statusCode: 200,
      message: 'Authentication successful',
      data: {
        id: user.id,
        name: user.name,
        token: token,
      },
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

  @put('/user/change-password', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'The updated user profile',
        content: {
          'application/json': {
            schema: UserProfileSchema,
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async changePassword(
    @inject(SecurityBindings.USER) currentUserProfile: UserProfile,
    @requestBody(PasswordChangeRequestBody) data: ChangePassword,
  ): Promise<any> {
    const {oldPassword, password} = data;
    const {id} = currentUserProfile;

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new HttpErrors.NotFound('User account not found');
    }
    const passwordError = await this.userService.validatePassword(password);
    if (passwordError) {
      return {
        success: false,
        message: passwordError,
      };
    }

    validatePassword(oldPassword);

    const isSame = await this.userService.verifyPassword(id, oldPassword);
    if (isSame) {
      const passwordHash = await this.passwordHasher.hashPassword(password);
      await this.userRepository
        .userCredential(user.id)
        .patch({password: passwordHash});
      return {
        statusCode: 200,
        message: 'Password changed successfully',
      };
    } else {
      throw new HttpErrors.Unauthorized('Incorrect User credentials');
    }
  }

  @patch('/users')
  @response(200, {
    description: 'User PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
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
  ): Promise<void> {
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
