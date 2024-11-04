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
import {SecurityBindings, UserProfile} from '@loopback/security';
import {Farmer} from '../models';
import {FarmerRepository, GeographicEntityRepository} from '../repositories';

export class FarmerController {
  constructor(
    @repository(FarmerRepository)
    public farmerRepository: FarmerRepository,

    @repository(GeographicEntityRepository)
    public geographicEntityRepository: GeographicEntityRepository,
  ) {}

  @post('/farmers')
  @response(200, {
    description: 'Farmer model instance',
    content: {'application/json': {schema: getModelSchemaRef(Farmer)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Farmer, {
            title: 'NewFarmer',
            exclude: ['id'],
          }),
        },
      },
    })
    farmer: Omit<Farmer, 'id'>,
  ): Promise<AnyObject> {
    const phoneExists = await this.farmerRepository.findOne({
      where: {
        phone: farmer.phone,
      },
    });
    if (phoneExists) {
      const errorMessage = `Phone number ${phoneExists.phone} is already registered`;
      throw new HttpErrors.Conflict(errorMessage);
    }
    const data = await this.farmerRepository.create(farmer);
    return {
      statusCode: 201,
      message: 'Farmer added successfully',
      data: data,
    };
  }

  @get('/farmers')
  @response(200, {
    description: 'Array of Farmer model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Farmer, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.query.string('villageId') villageId: string,
  ): Promise<any> {
    let where: any = {
      villageId: villageId,
    };
    const data = await this.farmerRepository.find({
      order: ['created DESC'],
      where: where,
    });
    return {
      statusCode: 200,
      message: "Farmer's list",
      data: data,
    };
  }

  @get('/farmers/{id}')
  @response(200, {
    description: 'Farmer model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Farmer, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Farmer, {exclude: 'where'})
    filter?: FilterExcludingWhere<Farmer>,
  ): Promise<AnyObject> {
    const data = await this.farmerRepository.findById(id, {
      include: [{relation: 'pits'}],
    });
    return {
      statusCode: 200,
      message: 'Farmer details',
      data: data,
    };
  }

  @patch('/farmers/{id}')
  @response(204, {
    description: 'Farmer PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Farmer, {partial: true}),
        },
      },
    })
    farmer: Farmer,
  ): Promise<void> {
    await this.farmerRepository.updateById(id, farmer);
  }

  @put('/farmers/{id}')
  @response(204, {
    description: 'Farmer PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() farmer: Farmer,
  ): Promise<void> {
    await this.farmerRepository.replaceById(id, farmer);
  }

  @del('/farmers/{id}')
  @response(204, {
    description: 'Farmer DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.farmerRepository.deleteById(id);
  }
}
