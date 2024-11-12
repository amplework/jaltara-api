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
  requestBody,
  response,
} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import _ from 'lodash';
import {Pit} from '../models';
import {
  FarmerRepository,
  PitRepository,
  StageRepository,
} from '../repositories';

export class PitController {
  constructor(
    @repository(StageRepository)
    public stageRepository: StageRepository,

    @repository(PitRepository)
    public pitRepository: PitRepository,

    @repository(FarmerRepository)
    public farmerRepository: FarmerRepository,
  ) {}

  @post('/pits')
  @response(200, {
    description: 'Pit model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pit)}},
  })
  @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pit, {
            title: 'NewPit',
            exclude: ['id'],
          }),
        },
      },
    })
    pit: Omit<Pit, 'id'>,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<AnyObject> {
    const userId = currentUserProfile[securityId];

    if (!pit.farmerId) {
      throw new HttpErrors.UnprocessableEntity('farmerId is missing');
    }

    const farmerData = await this.farmerRepository.findById(pit.farmerId);
    if (!farmerData) {
      throw new HttpErrors.NotFound(`Farmer ${pit.farmerId} does not exist`);
    }

    pit.villageId = farmerData.villageId;

    const newPitData = _.omit(pit, ['stage', 'equipmentId', 'stageName']);
    const createdPit = await this.pitRepository.create(newPitData);

    if (createdPit?.id) {
      const stageData = {
        pitId: createdPit.id,
        stageName: pit.stageName,
        photo: pit.photo,
        equipmentId: pit.equipmentId,
        updatedBy: userId,
      };
      await this.stageRepository.create(stageData);
    }

    return {
      statusCode: 201,
      message: 'Pit added successfully',
      data: createdPit,
    };
  }

  @get('/pits')
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
  async find(@param.query.string('villageId') villageId: string): Promise<any> {
    const data = await this.pitRepository.find({
      where: {
        farmer: {villageId: villageId},
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
              created: true,
              modified: true,
              equipmentId: true,
            },
            order: ['created DESC'],
          },
        },
        {
          relation: 'farmer',
          scope: {
            fields: {
              id: true,
              name: true,
              photo: true,
              villageId: true,
            },
            where: {
              villageId: villageId,
            },
          },
        },
      ],
    });

    return {
      statusCode: 200,
      message: 'Pits List',
      data: data,
    };
  }

  @get('/pits/{id}')
  @response(200, {
    description: 'Pit model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pit, {includeRelations: true}),
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<AnyObject> {
    const data = await this.pitRepository.findById(id, {
      include: [
        {relation: 'stages'},
        {relation: 'village'},
        {
          relation: 'farmer',
          scope: {
            fields: {
              id: true,
              name: true,
              photo: true,
            },
          },
        },
      ],
    });
    return {
      statusCode: 200,
      message: "Pit's details",
      data: data,
    };
  }

  @patch('/pits/{id}')
  @response(204, {
    description: 'Pit PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pit, {partial: true}),
        },
      },
    })
    pit: Pit,
  ): Promise<any> {
    await this.pitRepository.updateById(id, pit);
    return {
      statusCode: 200,
      message: 'Pit updated successfully',
    };
  }

  @del('/pits/{id}')
  @response(204, {
    description: 'Pit DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<any> {
    await this.pitRepository.deleteById(id);
    return {
      statusCode: 200,
      message: 'Pit deleted successfully',
    };
  }
}
