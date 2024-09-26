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
import _ from 'lodash';
import {PasswordHasherBindings, TokenServiceBindings} from '../keys';
import {User} from '../models';
import {UserRepository} from '../repositories';
import * as common from '../services/common';
import {PasswordHasher} from '../services/hash.password.bcryptjs';
import {TokenService} from '../services/jwt-service';
import {MyUserService} from '../services/user-service';
import {validateCredentials} from '../services/validator';
import {
  Credentials,
  CredentialsRequestBody,
  NewUserResponse,
} from '../utils/type-schema';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
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
    try {
      if (!user.password) {
        throw new HttpErrors.NotFound('Password key is missing');
      }
      user.password = user.password ?? common.generateString();

      validateCredentials(_.pick(user, ['email', 'phone', 'password']));

      const hashedPassword = await this.passwordHasher.hashPassword(
        user.password,
      );

      const emailExists = await this.userRepository.count({
        email: user.email,
      });
      if (emailExists?.count) {
        throw new HttpErrors.Conflict('Email already registered');
      }

      const savedUser = await this.userRepository.create(
        _.omit(user, [
          'password',
          'dob',
          'height',
          'weight',
          'position',
          'jerseySize',
          'jerseyNum',
          'internationalJerseyNum',
          'shoeSize',
        ]),
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
  ): Promise<{}> {
    const user = await this.userService.verifyCredentials(credentials);
    const userProfile = await this.userService.getUserProfile(user);
    const token = await this.jwtService.generateToken(userProfile);
    return {
      statusCode: 200,
      message: 'Authentication successful',
      data: {
        id: user.id,
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
