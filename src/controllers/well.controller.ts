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
import {Well} from '../models';
import {WellRepository} from '../repositories';

export class WellController {
  constructor(
    @repository(WellRepository)
    public wellRepository : WellRepository,
  ) {}

  @post('/wells')
  @response(200, {
    description: 'Well model instance',
    content: {'application/json': {schema: getModelSchemaRef(Well)}},
  })
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
  ): Promise<Well> {
    return this.wellRepository.create(well);
  }

  @get('/wells/count')
  @response(200, {
    description: 'Well model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Well) where?: Where<Well>,
  ): Promise<Count> {
    return this.wellRepository.count(where);
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
    @param.filter(Well) filter?: Filter<Well>,
  ): Promise<Well[]> {
    return this.wellRepository.find(filter);
  }

  @patch('/wells')
  @response(200, {
    description: 'Well PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Well, {partial: true}),
        },
      },
    })
    well: Well,
    @param.where(Well) where?: Where<Well>,
  ): Promise<Count> {
    return this.wellRepository.updateAll(well, where);
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
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Well, {exclude: 'where'}) filter?: FilterExcludingWhere<Well>
  ): Promise<Well> {
    return this.wellRepository.findById(id, filter);
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
  ): Promise<void> {
    await this.wellRepository.updateById(id, well);
  }

  @put('/wells/{id}')
  @response(204, {
    description: 'Well PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() well: Well,
  ): Promise<void> {
    await this.wellRepository.replaceById(id, well);
  }

  @del('/wells/{id}')
  @response(204, {
    description: 'Well DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.wellRepository.deleteById(id);
  }
}
