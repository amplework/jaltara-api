import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Stage} from '../models';
import {StageRepository} from '../repositories';

export class StageController {
  constructor(
    @repository(StageRepository)
    public stageRepository : StageRepository,
  ) {}

  @post('/stages')
  @response(200, {
    description: 'Stage model instance',
    content: {'application/json': {schema: getModelSchemaRef(Stage)}},
  })
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
  ): Promise<Stage> {
    return this.stageRepository.create(stage);
  }

  @get('/stages/count')
  @response(200, {
    description: 'Stage model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Stage) where?: Where<Stage>,
  ): Promise<Count> {
    return this.stageRepository.count(where);
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
  async find(
    @param.filter(Stage) filter?: Filter<Stage>,
  ): Promise<Stage[]> {
    return this.stageRepository.find(filter);
  }

  @patch('/stages')
  @response(200, {
    description: 'Stage PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stage, {partial: true}),
        },
      },
    })
    stage: Stage,
    @param.where(Stage) where?: Where<Stage>,
  ): Promise<Count> {
    return this.stageRepository.updateAll(stage, where);
  }

  @get('/stages/{id}')
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
    @param.filter(Stage, {exclude: 'where'}) filter?: FilterExcludingWhere<Stage>
  ): Promise<Stage> {
    return this.stageRepository.findById(id, filter);
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
