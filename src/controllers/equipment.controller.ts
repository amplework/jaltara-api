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
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Equipment} from '../models';
import {EquipmentRepository} from '../repositories';

export class EquipmentController {
  constructor(
    @repository(EquipmentRepository)
    public equipmentRepository: EquipmentRepository,
  ) {}

  @post('/equipment')
  @response(200, {
    description: 'Equipment model instance',
    content: {'application/json': {schema: getModelSchemaRef(Equipment)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipment, {
            title: 'NewEquipment',
            exclude: ['id'],
          }),
        },
      },
    })
    equipment: Omit<Equipment, 'id'>,
  ): Promise<AnyObject> {
    const data = await this.equipmentRepository.create(equipment);
    return {
      statusCode: 201,
      message: 'Equipment added successfully',
      data: data,
    };
  }

  @get('/equipment')
  @response(200, {
    description: 'Array of Equipment model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Equipment, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Equipment) filter?: Filter<Equipment>,
  ): Promise<any> {
    const data = await this.equipmentRepository.find(filter);
    return {
      statusCode: 200,
      message: "Equipment's List",
      data: data,
    };
  }

  @get('/equipment/{id}')
  @response(200, {
    description: 'Equipment model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Equipment, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Equipment, {exclude: 'where'})
    filter?: FilterExcludingWhere<Equipment>,
  ): Promise<AnyObject> {
    const data = await this.equipmentRepository.findById(id, filter);
    return {
      statusCode: 200,
      message: "Equipment's details",
      data: data,
    };
  }

  @patch('/equipment/{id}')
  @response(204, {
    description: 'Equipment PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipment, {partial: true}),
        },
      },
    })
    equipment: Equipment,
  ): Promise<any> {
    const data = await this.equipmentRepository.updateById(id, equipment);
    return {
      statusCode: 200,
      message: "Equipment's updated successfully",
      data: data,
    };
  }

  @del('/equipment/{id}')
  @response(204, {
    description: 'Equipment DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<any> {
    await this.equipmentRepository.deleteById(id);
    return {
      statusCode: 200,
      message: "Equipment's deleted successfully",
    };
  }
}
