import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  AnyObject,
  FilterExcludingWhere,
  repository,
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
      const errorMessage = `farmerId is missing`;
      throw new HttpErrors[422](errorMessage);
    }
    const farmerCheck = await this.farmerRepository.findById(pit.farmerId);
    if (!farmerCheck) {
      const errorMessage = `Farmer ${pit.farmerId} is not exists`;
      throw new HttpErrors[404](errorMessage);
    }
    const createPit = await this.pitRepository.create(
      _.omit(pit, ['stage', 'equipmentId']),
    );

    if (createPit && createPit.id) {
      let stageObject: object = {
        pitId: createPit.id,
        stageName: pit.stage,
        photo: pit.photo,
        equipmentId: pit.equipmentId,
        updatedBy: userId,
      };
      const createPitStage = await this.stageRepository.create(stageObject);
    }
    return {
      statusCode: 201,
      message: 'Pit added successfully',
      data: createPit,
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
  async find(): Promise<any> {
    const data = await this.pitRepository.find({
      order: ['created DESC'],
      include: [
        {
          relation: 'stages',
        },
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
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Pit, {exclude: 'where'}) filter?: FilterExcludingWhere<Pit>,
  ): Promise<AnyObject> {
    const data = await this.pitRepository.findById(id, {
      include: [
        {relation: 'stages'},
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
  ): Promise<void> {
    await this.pitRepository.updateById(id, pit);
  }

  @put('/pits/{id}')
  @response(204, {
    description: 'Pit PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pit: Pit,
  ): Promise<void> {
    await this.pitRepository.replaceById(id, pit);
  }

  @del('/pits/{id}')
  @response(204, {
    description: 'Pit DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pitRepository.deleteById(id);
  }
}
