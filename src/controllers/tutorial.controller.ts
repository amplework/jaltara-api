import {Filter, FilterExcludingWhere, repository} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Tutorial} from '../models';
import {TutorialRepository} from '../repositories';

export class TutorialController {
  constructor(
    @repository(TutorialRepository)
    public tutorialRepository: TutorialRepository,
  ) {}

  @post('/tutorials')
  @response(200, {
    description: 'Tutorial model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tutorial)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tutorial, {
            title: 'NewTutorial',
            exclude: ['id'],
          }),
        },
      },
    })
    tutorial: Omit<Tutorial, 'id'>,
  ): Promise<any> {
    const data = await this.tutorialRepository.create(tutorial);
    return {
      statusCode: 201,
      message: 'Tutorial Added',
      data: data,
    };
  }

  @get('/tutorials')
  @response(200, {
    description: 'Array of Tutorial model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tutorial, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Tutorial) filter?: Filter<Tutorial>): Promise<any> {
    const data = await this.tutorialRepository.find(filter);
    return {
      statusCode: 200,
      message: 'Tutorial List',
      data: data,
    };
  }

  @get('/tutorials/{id}')
  @response(200, {
    description: 'Tutorial model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tutorial, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Tutorial, {exclude: 'where'})
    filter?: FilterExcludingWhere<Tutorial>,
  ): Promise<any> {
    const data = await this.tutorialRepository.findById(id, filter);
    return {
      statusCode: 200,
      message: 'Tutorial Details',
      data: data,
    };
  }

  @patch('/tutorials/{id}')
  @response(204, {
    description: 'Tutorial PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tutorial, {partial: true}),
        },
      },
    })
    tutorial: Tutorial,
  ): Promise<any> {
    await this.tutorialRepository.updateById(id, tutorial);
    return {
      statusCode: 200,
      message: 'Tutorial Updated',
    };
  }

  @del('/tutorials/{id}')
  @response(204, {
    description: 'Tutorial DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<any> {
    await this.tutorialRepository.deleteById(id);
    return {
      statusCode: 200,
      message: 'Tutorial Deleted successfully',
    };
  }
}
