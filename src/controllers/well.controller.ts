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
  requestBody,
  response,
} from '@loopback/rest';
import {Well} from '../models';
import {GeographicEntityRepository, WellRepository} from '../repositories';

export class WellController {
  constructor(
    @repository(WellRepository)
    public wellRepository: WellRepository,

    @repository(GeographicEntityRepository)
    public geographicEntityRepository: GeographicEntityRepository,
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
  ): Promise<AnyObject> {
    if (!well.villageId) {
      throw new HttpErrors.UnprocessableEntity('villageId is missing');
    }

    const villageData = await this.geographicEntityRepository.findById(
      well.villageId,
    );
    if (!villageData) {
      throw new HttpErrors.NotFound(`Village ${well.villageId} does not exist`);
    }

    const data = await this.wellRepository.create(well);
    return {
      statusCode: 201,
      message: 'Well added successfully',
      data: data,
    };
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
  async find(@param.filter(Well) filter?: Filter<Well>): Promise<any> {
    const data = await this.wellRepository.find(filter);
    return {
      statusCode: 200,
      message: "Well's List",
      data: data,
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
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Well, {exclude: 'where'}) filter?: FilterExcludingWhere<Well>,
  ): Promise<AnyObject> {
    const data = await this.wellRepository.findById(id, filter);
    return {
      statusCode: 200,
      message: "Well's details",
      data: data,
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
