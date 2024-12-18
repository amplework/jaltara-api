import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {AnyObject, repository} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  Request,
  requestBody,
  response,
  RestBindings,
} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {Well} from '../models';
import {
  GeographicEntityRepository,
  StageRepository,
  WellRepository,
} from '../repositories';
import {ImageService} from '../services/image-service';

export class WellController {
  constructor(
    @repository(WellRepository)
    public wellRepository: WellRepository,

    @repository(GeographicEntityRepository)
    public geographicEntityRepository: GeographicEntityRepository,

    @repository(StageRepository)
    public stageRepository: StageRepository,

    @inject('services.ImageService') private imageService: ImageService,
  ) {}

  @post('/wells')
  @response(200, {
    description: 'Well model instance',
    content: {'application/json': {schema: getModelSchemaRef(Well)}},
  })
  @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Well, {
            title: 'NewWell',
            exclude: ['id'],
          }),
        },
      },
    })
    well: Omit<Well, 'id'>,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @inject(RestBindings.Http.REQUEST) request: Request,
  ): Promise<any> {
    const userId = currentUserProfile[securityId];
    if (!well.villageId) {
      throw new HttpErrors.UnprocessableEntity('villageId is missing');
    }

    const villageData = await this.geographicEntityRepository.findById(
      well.villageId,
    );
    if (!villageData) {
      throw new HttpErrors.NotFound(`Village ${well.villageId} does not exist`);
    }
    console.log('start--------->');
    const imageData = await this.imageService.uploadImage(request);
    well.villageId = villageData.id;
    console.log('payload', well);
    console.log('imageData', imageData);

    // const newWellData = _.omit(well, ['equipmentId']);
    // const createdWell = await this.wellRepository.create(newWellData);
    // if (createdWell.id) {
    //   const stageData = {
    //     wellId: createdWell.id,
    //     stageName: 'maintenance',
    //     maintenanceType: 'mini maintenance',
    //     briefMaintenance: 'well maintenance',
    //     photo: well.photo,
    //     updatedBy: userId,
    //     equipmentId: well.equipmentId,
    //   };
    //   await this.stageRepository.create(stageData);
    // }
    // return {
    //   statusCode: 201,
    //   message: 'Well added successfully',
    //   data: createdWell,
    // };
  }

  @get('/wells')
  @response(200, {
    description: 'Array of Well model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Well, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.query.string('villageName') villageName: string,
    @param.query.string('sevakName') sevakName: string,
  ): Promise<any> {
    const filter: any = {
      order: ['created DESC'],
      include: [
        {
          relation: 'village',
          scope: {
            fields: {
              id: true,
              name: true,
            },
            where: {name: villageName},
          },
        },
        {
          relation: 'stages',
          scope: {
            fields: {
              id: true,
              wellId: true,
              created: true,
              updatedBy: true,
            },
            order: ['created DESC'],
            limit: 1,
            include: [
              {
                relation: 'updatedbySevek',
                scope: {
                  fields: {
                    id: true,
                    name: true,
                  },
                  where: {name: sevakName},
                },
              },
            ],
          },
        },
      ],
    };
    const data = await this.wellRepository.find(filter);
    const filteredData = data.filter(
      (item: any) =>
        item.village &&
        item.stages &&
        item.stages.some((stage: any) => stage.updatedbySevek),
    );
    return {
      statusCode: 200,
      message: "Well's List",
      data: filteredData,
    };
  }

  @get('/wells/{id}')
  @response(200, {
    description: 'Well model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Well, {includeRelations: true}),
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<AnyObject> {
    const filter: any = {
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
        {
          relation: 'stages',
          scope: {
            fields: {
              id: true,
              wellId: true,
              photo: true,
              created: true,
              updatedBy: true,
            },
            order: ['created DESC'],
            include: [
              {
                relation: 'updatedbySevek',
                scope: {
                  fields: {
                    id: true,
                    name: true,
                    image: true,
                  },
                },
              },
            ],
          },
        },
      ],
    };

    const data = await this.wellRepository.findById(id, filter);
    const checkUpperGeo =
      await this.geographicEntityRepository.fetchUpperHierarchy(data.villageId);
    return {
      statusCode: 200,
      message: "Well's details",
      data: {...data, checkUpperGeo},
    };
  }

  @patch('/wells/{id}')
  @response(204, {
    description: 'Well PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Well, {partial: true}),
        },
      },
    })
    well: Well,
  ): Promise<any> {
    await this.wellRepository.updateById(id, well);
    return {
      statusCode: 200,
      message: 'Well added successfully',
    };
  }

  @del('/wells/{id}')
  @response(204, {
    description: 'Well DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<any> {
    await this.wellRepository.deleteById(id);
    return {
      statusCode: 200,
      message: 'Well deleted successfully',
    };
  }
}
