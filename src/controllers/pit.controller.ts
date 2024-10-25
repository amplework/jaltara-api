import {
  AnyObject,
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
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Pit} from '../models';
import {PitRepository} from '../repositories';

export class PitController {
  constructor(
    @repository(PitRepository)
    public pitRepository: PitRepository,
  ) {}

  @post('/pits')
  @response(200, {
    description: 'Pit model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pit)}},
  })
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
  ): Promise<AnyObject> {
    const data = await this.pitRepository.create(pit);
    return {
      statusCode: 201,
      message: 'Pit added successfully',
      data: data,
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
  async find(@param.filter(Pit) filter?: Filter<Pit>): Promise<any> {
    const data = await this.pitRepository.find(filter);
    return {
      statusCode: 200,
      message: 'Pits List',
      data: data,
    };
  }

  @patch('/pits')
  @response(200, {
    description: 'Pit PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pit, {partial: true}),
        },
      },
    })
    pit: Pit,
    @param.where(Pit) where?: Where<Pit>,
  ): Promise<Count> {
    return this.pitRepository.updateAll(pit, where);
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
    const data = await this.pitRepository.findById(id, filter);
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
