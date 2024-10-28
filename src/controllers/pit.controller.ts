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
import {Pit} from '../models';
import {FarmerRepository, PitRepository} from '../repositories';

export class PitController {
  constructor(
    @repository(PitRepository)
    public pitRepository: PitRepository,
    @repository(FarmerRepository)
    public farmerRepository: FarmerRepository,
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
    if (!pit.farmerId) {
      const errorMessage = `farmerId is missing`;
      throw new HttpErrors[422](errorMessage);
    }
    const farmerCheck = await this.farmerRepository.findById(pit.farmerId);
    if (!farmerCheck) {
      const errorMessage = `Farmer ${pit.farmerId} is not exists`;
      throw new HttpErrors[404](errorMessage);
    }
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
  async find(): Promise<any> {
    const data = await this.pitRepository.find({
      include: [{relation: 'stages'}],
    });
    return {
      statusCode: 200,
      message: 'Pits List',
      data: data,
    };
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
    const data = await this.pitRepository.findById(id, {
      include: [{relation: 'stages'}],
    });
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
