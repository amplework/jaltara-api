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
import {Pit, User} from '../models';
import {
  FarmerRepository,
  GeographicEntityRepository,
  PitRepository,
  StageRepository,
  UserCodeRepository,
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

    const getUserResponse = async (userData: User) => {
      const userProfile = await this.userService.getUserProfile(userData);
      const token = await this.jwtService.generateToken(userProfile);

      return {
        statusCode: 200,
        message: existingUser
          ? 'Authentication successful'
          : 'User added successfully.',
        data: {
          id: userData.id,
          name: userData.name,
          token,
        },
      };
    };

    if (existingUser) {
      return getUserResponse(existingUser);
    }

    const newUser = await this.userRepository.create(user);
    if (!newUser) {
      throw new HttpErrors.BadRequest('Error in creating new User!');
    }

    return getUserResponse(newUser);
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

    const filteredData = data.filter(user => user.village);

    return {
      statusCode: 200,
      message: 'User list',
      data: filteredData,
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
    const userData = await this.userRepository.findById(id);

    const checkGeo = await this.geographicEntityRepository.fetchHierarchy(
      userData.villageId,
    );

    const countInGeo = async (
      geoNode: any,
    ): Promise<{farmerCount: number; wellCount: number; pitCount: number}> => {
      const farmerCountResult = await this.farmerRepository.count({
        villageId: geoNode.id,
      });

      const pitCountResult = await this.pitRepository.count({
        villageId: geoNode.id,
      });

      const wellCountResult = await this.wellRepository.count({
        villageId: geoNode.id,
      });

      const childrenCounts = await Promise.all(
        (geoNode.children || []).map(async (childNode: any) => {
          return await countInGeo(childNode);
        }),
      );

      const totalFarmerCount =
        farmerCountResult.count +
        childrenCounts.reduce((sum, count) => sum + count.farmerCount, 0);
      const totalPitCount =
        pitCountResult.count +
        childrenCounts.reduce((sum, count) => sum + count.pitCount, 0);
      const totalWellCount =
        wellCountResult.count +
        childrenCounts.reduce((sum, count) => sum + count.wellCount, 0);

      return {
        farmerCount: totalFarmerCount,
        pitCount: totalPitCount,
        wellCount: totalWellCount,
      };
    };

    const totalCounts = await countInGeo(checkGeo);
    return {
      statusCode: 200,
      message: 'User details',
      data: userData,
      farmerCount: totalCounts.farmerCount,
      pitCount: totalCounts.pitCount,
      wellCount: totalCounts.wellCount,
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
    const data = await this.userRepository.updateById(id, user);
    return {
      statusCode: 200,
      message: 'User details updated',
      data: data,
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

  @get('/sevak-pits')
  @response(200, {
    description: 'Array of Pit model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pit, {includeRelations: true}),
        },
      },
    },
  })
  async findPit(
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

    const userDetails = [];

    for (const userData of data) {
      const checkGeo = await this.geographicEntityRepository.fetchHierarchy(
        userData.villageId,
      );

      const countInGeo = async (
        geoNode: any,
      ): Promise<{
        pitCount: number;
        pits: Array<{id: string; stages: Array<{stageName: string}>}>;
      }> => {
        const pits = await this.pitRepository.find({
          where: {
            villageId: geoNode.id,
          },
          order: ['created DESC'],
          fields: {
            id: true,
            pitId: true,
            level: true,
            farmerId: true,
            villageId: true,
            equipmentId: true,
          },
          include: [
            {
              relation: 'stages',
              scope: {
                fields: {
                  id: true,
                  pitId: true,
                  stageName: true,
                  equipmentId: true,
                },
                order: ['created DESC'],
              },
            },
          ],
        });

        const pitDetails = pits.map(pit => ({
          id: pit.id,
          stages: (pit.stages || []).map(stage => ({
            stageName: stage.stageName,
          })),
        }));

        const childrenResults = await Promise.all(
          (geoNode.children || []).map(async (childNode: any) => {
            return await countInGeo(childNode);
          }),
        );

        const totalPitCount =
          pitDetails.length +
          childrenResults.reduce((sum, result) => sum + result.pitCount, 0);
        const allPits = [
          ...pitDetails,
          ...childrenResults.flatMap(result => result.pits),
        ];

        return {
          pitCount: totalPitCount,
          pits: allPits,
        };
      };

      const totalCounts = await countInGeo(checkGeo);

      userDetails.push({
        userData,
        pitCount: totalCounts.pitCount,
        pitDetails: totalCounts.pits,
      });
    }
    const totalDugPit = await this.stageRepository.count({
      stageName: 'digging',
    });
    const totalCompletePit = await this.stageRepository.count({
      stageName: 'filling',
    });

    return {
      statusCode: 200,
      message: 'User details with pit counts and stages',
      totalDugPit: totalDugPit.count,
      totalCompletePit: totalCompletePit.count,
      data: userDetails,
    };
  }
}