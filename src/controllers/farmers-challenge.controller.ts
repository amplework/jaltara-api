import {FilterExcludingWhere, repository} from '@loopback/repository';
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
import {FarmersChallenge} from '../models';
import {FarmersChallengeRepository} from '../repositories';

export class FarmersChallengeController {
  constructor(
    @repository(FarmersChallengeRepository)
    public farmersChallengeRepository: FarmersChallengeRepository,
  ) {}

  @post('/farmers-challenges')
  @response(200, {
    description: 'FarmersChallenge model instance',
    content: {
      'application/json': {schema: getModelSchemaRef(FarmersChallenge)},
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FarmersChallenge, {
            title: 'NewFarmersChallenge',
            exclude: ['id'],
          }),
        },
      },
    })
    farmersChallenge: Omit<FarmersChallenge, 'id'>,
  ): Promise<any> {
    const data = await this.farmersChallengeRepository.create(farmersChallenge);
    return {
      statusCode: 201,
      message: "Farmer's Challenge added successfully",
      data: data,
    };
  }

  @get('/farmers-challenges')
  @response(200, {
    description: 'Array of FarmersChallenge model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(FarmersChallenge, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.query.string('challenge') challenge?: string,
    @param.query.string('status') status?: string,
  ): Promise<any> {
    const data = await this.farmersChallengeRepository.find({
      where: {
        challenge: challenge,
        status: status,
      },
      order: ['created DESC'],
    });
    return {
      statusCode: 200,
      message: "Farmer's Challenges List",
      data: data,
    };
  }

  @get('/farmers-challenges/{id}')
  @response(200, {
    description: 'FarmersChallenge model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(FarmersChallenge, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(FarmersChallenge, {exclude: 'where'})
    filter?: FilterExcludingWhere<FarmersChallenge>,
  ): Promise<any> {
    const data = await this.farmersChallengeRepository.findById(id);
    return {
      statusCode: 200,
      message: 'farmers-challenges details',
      data: data,
    };
  }

  @patch('/farmers-challenges/{id}')
  @response(204, {
    description: 'FarmersChallenge PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FarmersChallenge, {partial: true}),
        },
      },
    })
    farmersChallenge: FarmersChallenge,
  ): Promise<any> {
    await this.farmersChallengeRepository.updateById(id, farmersChallenge);
    return {
      statusCode: 200,
      message: 'farmers-challenges update successfully',
    };
  }

  @del('/farmers-challenges/{id}')
  @response(204, {
    description: 'FarmersChallenge DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.farmersChallengeRepository.deleteById(id);
  }
}
