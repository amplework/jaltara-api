import {
  AnyObject,
  FilterExcludingWhere,
  repository,
} from '@loopback/repository';
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
import {Crop} from '../models';
import {CropRepository} from '../repositories';

export class CropController {
  constructor(
    @repository(CropRepository)
    public cropRepository: CropRepository,
  ) {}

  @post('/crops')
  @response(200, {
    description: 'Crop model instance',
    content: {'application/json': {schema: getModelSchemaRef(Crop)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Crop, {
            title: 'NewCrop',
            exclude: ['id'],
          }),
        },
      },
    })
    crop: Omit<Crop, 'id'>,
  ): Promise<any> {
    const data = await this.cropRepository.create(crop);
    return {
      statusCode: 201,
      message: 'Crop added successfully',
      data: data,
    };
  }

  @get('/crops')
  @response(200, {
    description: 'Array of Crop model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Crop, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.query.string('name') name: string): Promise<any> {
    const data = await this.cropRepository.find({
      order: ['created DESC'],
      where: {
        name: name,
      },
    });
    return {
      statusCode: 200,
      message: 'Crop List',
      data: data,
    };
  }

  @get('/crops/{id}')
  @response(200, {
    description: 'Crop model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Crop, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Crop, {exclude: 'where'}) filter?: FilterExcludingWhere<Crop>,
  ): Promise<AnyObject> {
    const data = await this.cropRepository.findById(id, filter);
    return {
      statusCode: 200,
      message: "Crop's details",
      data: data,
    };
  }

  @patch('/crops/{id}')
  @response(204, {
    description: 'Crop PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Crop, {partial: true}),
        },
      },
    })
    crop: Crop,
  ): Promise<any> {
    const data = await this.cropRepository.updateById(id, crop);
    return {
      statusCode: 200,
      message: 'Crop updated successfully',
      data: data,
    };
  }

  @del('/crops/{id}')
  @response(204, {
    description: 'Crop DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<any> {
    await this.cropRepository.deleteById(id);
    return {
      statusCode: 200,
      message: 'Crop deleted successfully',
    };
  }
}
