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
import _ from 'lodash';
import {GeographicEntity} from '../models';
import {GeographicEntityRepository} from '../repositories';

export class GeographicController {
  constructor(
    @repository(GeographicEntityRepository)
    public geographicEntityRepository: GeographicEntityRepository,
  ) {}

  @post('/geographic-entities')
  @response(200, {
    description: 'GeographicEntity model instance',
    content: {
      'application/json': {schema: getModelSchemaRef(GeographicEntity)},
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GeographicEntity, {
            title: 'NewGeographicEntity',
            exclude: ['id'],
          }),
        },
      },
    })
    geographicEntity: Omit<GeographicEntity, 'id'>,
  ): Promise<any> {
    if (geographicEntity.entityType !== 'state' && !geographicEntity.parentId) {
      return {
        statusCode: 422,
        message: `parentId key is required for entityType ${geographicEntity.entityType}`,
      };
    }

    const existingEntity = await this.geographicEntityRepository.findOne({
      where: {
        entityType: geographicEntity.entityType,
        name: new RegExp(`^${geographicEntity.name}$`, 'i'),
      },
    });

    if (existingEntity) {
      return {
        statusCode: 409,
        message: `The Geographic entity with name '${geographicEntity.name}' already exists for entityType '${geographicEntity.entityType}'`,
      };
    }

    const newGeoData =
      geographicEntity.entityType === 'state'
        ? _.omit(geographicEntity, ['parentId'])
        : geographicEntity;

    const createdData =
      await this.geographicEntityRepository.create(newGeoData);

    return {
      statusCode: 201,
      message: 'Geographic entity added successfully',
      data: createdData,
    };
  }

  @get('/state')
  @response(200, {
    description: 'Array of GeographicEntity model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(GeographicEntity, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(GeographicEntity) filter?: Filter<GeographicEntity>,
    @param.query.string('entityType') entityType?: string,
    @param.query.string('parentId') parentId?: string,
  ): Promise<any> {
    const data = await this.geographicEntityRepository.find({
      where: {
        entityType: 'state',
      },
    });
    return {
      statusCode: 200,
      message: "State's list",
      data: data,
    };
  }

  @get('/locations')
  @response(200, {
    description: 'Array of GeographicEntity model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(GeographicEntity, {includeRelations: true}),
        },
      },
    },
  })
  async locations(
    @param.filter(GeographicEntity) filter?: Filter<GeographicEntity>,
    @param.query.string('entityType') entityType?: string,
    @param.query.string('parentId') parentId?: string,
  ): Promise<any> {
    const data = await this.geographicEntityRepository.find({
      where: {
        entityType: entityType || 'village',
      },
    });

    const enrichedData = await Promise.all(
      data.map(async geo => {
        const checkUpperGeo =
          await this.geographicEntityRepository.fetchUpperHierarchy(geo.id);
        if (!checkUpperGeo) return null;

        const farmerCount = await this.geographicEntityRepository
          .farmers(geo.id)
          .find({})
          .then(farmers => farmers.length);

        return {
          ...geo,
          checkUpperGeo,
          farmerCount,
        };
      }),
    );

    return {
      statusCode: 200,
      message: "Village's list",
      data: enrichedData,
    };
  }

  @get('/locations/{id}')
  @response(200, {
    description: 'GeographicEntity model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(GeographicEntity, {includeRelations: true}),
      },
    },
  })
  async locationsById(
    @param.path.string('id') id: string,
    @param.filter(GeographicEntity, {exclude: 'where'})
    filter?: FilterExcludingWhere<GeographicEntity>,
  ): Promise<any> {
    const geo = await this.geographicEntityRepository.findById(id, filter);
    const checkUpperGeo =
      await this.geographicEntityRepository.fetchUpperHierarchy(geo.id);

    const farmerCount = await this.geographicEntityRepository
      .farmers(geo.id)
      .find({})
      .then(farmers => farmers.length);

    return {
      ...geo,
      checkUpperGeo,
      farmerCount,
    };
  }

  @get('/geographic-entities/{id}')
  @response(200, {
    description: 'GeographicEntity model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(GeographicEntity, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(GeographicEntity, {exclude: 'where'})
    filter?: FilterExcludingWhere<GeographicEntity>,
  ): Promise<AnyObject> {
    const mainEntity = await this.geographicEntityRepository.findById(
      id,
      filter,
    );
    const childEntities =
      await this.geographicEntityRepository.findChildren(id);

    return {
      statusCode: 200,
      message: "Geographic-Entities's details with related entities",
      data: {
        mainEntity: mainEntity,
        childEntities: childEntities,
      },
    };
  }

  @patch('/geographic-entities/{id}')
  @response(204, {
    description: 'GeographicEntity PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GeographicEntity, {partial: true}),
        },
      },
    })
    geographicEntity: GeographicEntity,
  ): Promise<any> {
    await this.geographicEntityRepository.updateById(id, geographicEntity);
    return {
      statusCode: 200,
      message: 'Geographic-Entities updated successfully',
    };
  }

  @del('/geographic-entities/{id}')
  @response(204, {
    description: 'GeographicEntity DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<any> {
    await this.geographicEntityRepository.deleteById(id);
    return {
      statusCode: 200,
      message: 'Geographic-Entities deleted successfully',
    };
  }
}
