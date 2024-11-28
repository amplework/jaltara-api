import {AnyObject, repository} from '@loopback/repository';
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
import {Farmer} from '../models';
import {
  FarmerRepository,
  GeographicEntityRepository,
  PitRepository,
} from '../repositories';

export class FarmerController {
  constructor(
    @repository(FarmerRepository)
    public farmerRepository: FarmerRepository,

    @repository(GeographicEntityRepository)
    public geographicEntityRepository: GeographicEntityRepository,

    @repository(PitRepository)
    public pitRepository: PitRepository,
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
      return {
        statusCode: 409,
        message: errorMessage,
      };
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
  async find(
    @param.query.string('name') name?: string,
    @param.query.string('villageName') villageName?: string,
  ): Promise<any> {
    const data = await this.farmerRepository.find({
      where: {
        name: name,
      },
      order: ['created DESC'],
      include: [
        {
          relation: 'pits',
          scope: {
            fields: {
              id: true,
              farmerId: true,
            },
          },
        },
        {
          relation: 'village',
          scope: {
            fields: {
              id: true,
              name: true,
            },
            where: {
              name: villageName,
            },
          },
        },
      ],
    });

    const enrichedData = data.map(farmer => ({
      ...farmer,
      totalPits: farmer.pits?.length || 0,
    }));

    return {
      statusCode: 200,
      message: "Farmer's list",
      data: enrichedData,
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
  async findById(@param.path.string('id') id: string): Promise<AnyObject> {
    const farmerData = await this.farmerRepository.findById(id, {
      include: [{relation: 'pits'}, {relation: 'village'}],
    });

    const response: AnyObject = {
      statusCode: 200,
      message: 'Farmer details',
      data: farmerData,
    };

    if (farmerData.villageId) {
      const checkUpperGeo =
        await this.geographicEntityRepository.fetchUpperHierarchy(
          farmerData.villageId,
        );
      response.data = {...farmerData, checkUpperGeo};
    }

    return response;
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
  ): Promise<any> {
    const data = await this.farmerRepository.updateById(id, farmer);
    return {
      statusCode: 200,
      message: 'Farmer updated successfully',
      data: data,
    };
  }

  @del('/farmers/{id}')
  @response(204, {
    description: 'Farmer DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<any> {
    await this.farmerRepository.deleteById(id);
    return {
      statusCode: 200,
      message: 'Farmer deleted successfully',
    };
  }
}
