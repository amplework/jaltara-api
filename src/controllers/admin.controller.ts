import {inject, service} from '@loopback/core';
import {AnyObject, repository} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {PasswordHasherBindings, TokenServiceBindings} from '../keys';
import {User} from '../models';
import {
  FarmerRepository,
  GeographicEntityRepository,
  PitRepository,
  StageRepository,
  UserCodeRepository,
  UserCredentialRepository,
  UserRepository,
  WellRepository,
} from '../repositories';
import {PasswordHasher} from '../services/hash.password.bcryptjs';
import {TokenService} from '../services/jwt-service';
import {MyUserService} from '../services/user-service';

export class AdminController {
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

    @repository(PitRepository)
    public pitRepository: PitRepository,

    @repository(WellRepository)
    public wellRepository: WellRepository,

    @repository(FarmerRepository)
    public farmerRepository: FarmerRepository,

    @repository(GeographicEntityRepository)
    public geographicEntityRepository: GeographicEntityRepository,

    @repository(StageRepository)
    public stageRepository: StageRepository,

    @repository(UserCredentialRepository)
    public userCredentialRepository: UserCredentialRepository,
  ) {}

  @post('/sevak-add')
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
    const existingUser = await this.userRepository.findOne({
      where: {phone: user.phone},
    });

    if (existingUser) {
      return {
        statusCode: 409,
        message: 'Sevek is already registered',
      };
    }

    const newUser = await this.userRepository.create(user);
    if (!newUser) {
      throw new HttpErrors.BadRequest('Error in creating new User!');
    }
    return {
      statusCode: 201,
      message: 'Sevek added successfully',
      data: newUser,
    };
  }

  @get('/sevak-list')
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
  async find(
    @param.query.string('villageName') villageName: string,
    @param.query.string('name') name: string,
  ): Promise<any> {
    const data = await this.userRepository.find({
      order: ['created DESC'],
      where: {
        name: name,
      },
      include: [
        {
          relation: 'village',
          scope: {
            where: {
              name: villageName,
              id: {neq: null},
            },
          },
        },
      ],
    });

    // const filteredData = data.filter(user => user.village);

    return {
      statusCode: 200,
      message: 'User list',
      data: data,
    };
  }

  @get('/list')
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
  async findSevek(
    @param.query.string('villageName') villageName?: string,
    @param.query.string('name') name?: string,
  ): Promise<any> {
    const whereCondition: any = {};
    if (name) {
      whereCondition.name = {name, $options: 'i'};
    }

    const includeCondition: any = {
      relation: 'village',
      scope: {
        where: {
          id: {neq: null},
        },
      },
    };

    if (villageName) {
      includeCondition.scope.where.name = {villageName, $options: 'i'};
    }
    const data = await this.userRepository.find({
      order: ['created DESC'],
      where: whereCondition,
      include: [includeCondition],
    });

    return {
      statusCode: 200,
      message: 'User list',
      data: data,
    };
  }

  @get('/sevak-details/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<AnyObject> {
    const userData = await this.userRepository.findById(id, {
      include: [
        {
          relation: 'stages',
          scope: {
            include: [
              {
                relation: 'pit',
                scope: {
                  fields: {
                    id: true,
                    pitId: true,
                    photo: true,
                    plotSize: true,
                    level: true,
                    farmerId: true,
                    villageId: true,
                  },
                  include: [
                    {
                      relation: 'farmer',
                      scope: {
                        fields: {
                          id: true,
                          name: true,
                          photo: true,
                          land: true,
                          villageId: true,
                        },
                      },
                    },
                    {
                      relation: 'village',
                      scope: {
                        fields: {
                          id: true,
                          name: true,
                        },
                      },
                    },
                    {relation: 'logs'},
                  ],
                },
              },
              {
                relation: 'well',
                scope: {
                  fields: {
                    id: true,
                    wellId: true,
                    photo: true,
                    plotSize: true,
                    level: true,
                    villageId: true,
                  },
                  include: [
                    {
                      relation: 'village',
                      scope: {
                        fields: {
                          id: true,
                          name: true,
                        },
                      },
                    },
                    {relation: 'logs'},
                  ],
                },
              },
            ],
          },
        },
      ],
    });

    let totalCounts = {farmerCount: 0, pitCount: 0, wellCount: 0};

    if (userData.villageId) {
      const [checkGeo, checkUpperGeo] = await Promise.all([
        this.geographicEntityRepository.fetchHierarchy(userData.villageId),
        this.geographicEntityRepository.fetchUpperHierarchy(userData.villageId),
      ]);

      const countInGeo = async (
        geoNode: any,
      ): Promise<{
        farmerCount: number;
        wellCount: number;
        pitCount: number;
      }> => {
        const [farmerCountResult, pitCountResult, wellCountResult] =
          await Promise.all([
            this.farmerRepository.count({villageId: geoNode.id}),
            this.pitRepository.count({villageId: geoNode.id}),
            this.wellRepository.count({villageId: geoNode.id}),
          ]);

        const childrenCounts = await Promise.all(
          (geoNode.children || []).map((childNode: any) =>
            countInGeo(childNode),
          ),
        );

        return {
          farmerCount:
            farmerCountResult.count +
            childrenCounts.reduce((sum, count) => sum + count.farmerCount, 0),
          pitCount:
            pitCountResult.count +
            childrenCounts.reduce((sum, count) => sum + count.pitCount, 0),
          wellCount:
            wellCountResult.count +
            childrenCounts.reduce((sum, count) => sum + count.wellCount, 0),
        };
      };

      totalCounts = await countInGeo(checkGeo);
      userData.checkUpperGeo = checkUpperGeo;
    }

    return {
      statusCode: 200,
      message: 'User details',
      data: {
        ...userData,
        ...totalCounts,
      },
    };
  }

  @patch('/sevak-update/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() user: any,
  ): Promise<any> {
    const userExists = await this.userRepository.findById(id);
    if (!userExists) {
      throw new HttpErrors.NotFound('User account not found');
    }

    if (!userExists.villageId) {
      if (user.status === 'active' && !user.villageId) {
        return {
          statusCode: 422,
          message: 'User cannot be active until a location has been assigned',
        };
      }
    }

    if (user.villageId) {
      await this.geographicEntityRepository.findById(user.villageId);
    }
    if (user.status === 'active') {
      await this.userCredentialRepository.deleteAll({
        userId: id,
      });
    }
    await this.userRepository.updateById(id, user);
    return {
      statusCode: 200,
      message: 'User details updated',
    };
  }

  @del('/sevak-delete/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<any> {
    await this.userRepository.deleteById(id);
    return {
      statusCode: 200,
      message: 'User deleted successfully',
    };
  }
}
