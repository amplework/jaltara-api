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
import {Log} from '../models';
import {LogRepository} from '../repositories';

export class LogController {
  constructor(
    @repository(LogRepository)
    public logRepository: LogRepository,
  ) {}

  @post('/logs')
  @response(200, {
    description: 'Log model instance',
    content: {'application/json': {schema: getModelSchemaRef(Log)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Log, {
            title: 'NewLog',
            exclude: ['id'],
          }),
        },
      },
    })
    log: Omit<Log, 'id'>,
  ): Promise<AnyObject> {
    const data = await this.logRepository.create(log);
    return {
      statusCode: 201,
      message: 'Log added successfully',
      data: data,
    };
  }

  @get('/logs')
  @response(200, {
    description: 'Array of Log model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Log, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Log) filter?: Filter<Log>): Promise<any> {
    const data = await this.logRepository.find(filter);
    return {
      statusCode: 200,
      message: 'Log List',
      data: data,
    };
  }

  @patch('/logs')
  @response(200, {
    description: 'Log PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Log, {partial: true}),
        },
      },
    })
    log: Log,
    @param.where(Log) where?: Where<Log>,
  ): Promise<Count> {
    return this.logRepository.updateAll(log, where);
  }

  @get('/logs/{id}')
  @response(200, {
    description: 'Log model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Log, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Log, {exclude: 'where'}) filter?: FilterExcludingWhere<Log>,
  ): Promise<AnyObject> {
    const data = await this.logRepository.findById(id, filter);
    return {
      statusCode: 200,
      message: "Log's details",
      data: data,
    };
  }

  @patch('/logs/{id}')
  @response(204, {
    description: 'Log PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Log, {partial: true}),
        },
      },
    })
    log: Log,
  ): Promise<void> {
    await this.logRepository.updateById(id, log);
  }

  @put('/logs/{id}')
  @response(204, {
    description: 'Log PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() log: Log,
  ): Promise<void> {
    await this.logRepository.replaceById(id, log);
  }

  @del('/logs/{id}')
  @response(204, {
    description: 'Log DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.logRepository.deleteById(id);
  }
}
