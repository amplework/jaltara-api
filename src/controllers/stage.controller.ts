import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  AnyObject,
  Filter,
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
import {Stage} from '../models';
import {
  FarmerRepository,
  PitRepository,
  StageRepository,
} from '../repositories';

export class StageController {
  constructor(
    @repository(StageRepository)
    public stageRepository: StageRepository,
    @repository(PitRepository)
    public pitRepository: PitRepository,
    @repository(FarmerRepository)
    public farmerRepository: FarmerRepository,
  ) {}

  @post('/stages')
  @response(200, {
    description: 'Stage model instance',
    content: {'application/json': {schema: getModelSchemaRef(Stage)}},
  })
  @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stage, {
            title: 'NewStage',
            exclude: ['id'],
          }),
        },
      },
    })
    stage: Omit<Stage, 'id'>,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<AnyObject> {
    const userId = currentUserProfile[securityId];

    if (!stage.pitId) {
      const errorMessage = `pitId is missing`;
      throw new HttpErrors[422](errorMessage);
    }

    const pitCheck = await this.pitRepository.findById(stage.pitId);
    if (!pitCheck) {
      const errorMessage = `pitId ${stage.pitId} does not exist`;
      throw new HttpErrors[404](errorMessage);
    }

    if (stage.stageName !== 'maintenance') {
      const existingStage = await this.stageRepository.findOne({
        where: {
          pitId: stage.pitId,
          stageName: stage.stageName,
        },
      });
      if (existingStage) {
        throw new HttpErrors[409](
          `The stageName '${stage.stageName}' already exists for this pit`,
        );
      }
    }

    stage.updatedBy = userId;

    const data = await this.stageRepository.create(stage);
    return {
      statusCode: 201,
      message: 'Stage added successfully',
      data: data,
    };
  }

  @get('/stages')
  @response(200, {
    description: 'Array of Stage model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Stage, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Stage) filter?: Filter<Stage>): Promise<any> {
    const data = await this.stageRepository.find(filter);
    return {
      statusCode: 200,
      message: 'stage list',
      data: data,
    };
  }

  @get('/stages/{pitId}')
  @response(200, {
    description: 'Stage model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Stage, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Stage, {exclude: 'where'})
    filter?: FilterExcludingWhere<Stage>,
  ): Promise<AnyObject> {
    const data = await this.stageRepository.findById(id, filter);
    return {
      statusCode: 200,
      message: "stage's details",
      data: data,
    };
  }

  @patch('/stages/{id}')
  @response(204, {
    description: 'Stage PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stage, {partial: true}),
        },
      },
    })
    stage: Stage,
  ): Promise<void> {
    await this.stageRepository.updateById(id, stage);
  }

  @put('/stages/{id}')
  @response(204, {
    description: 'Stage PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() stage: Stage,
  ): Promise<void> {
    await this.stageRepository.replaceById(id, stage);
  }

  @del('/stages/{id}')
  @response(204, {
    description: 'Stage DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.stageRepository.deleteById(id);
  }
}
