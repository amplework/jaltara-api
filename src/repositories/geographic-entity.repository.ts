import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {GeographicEntity, GeographicEntityRelations} from '../models';

export class GeographicEntityRepository extends DefaultCrudRepository<
  GeographicEntity,
  typeof GeographicEntity.prototype.id,
  GeographicEntityRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(GeographicEntity, dataSource);
  }

  async findChildren(parentId: string): Promise<GeographicEntity[]> {
    return this.find({where: {parentId}});
  }

  async findParent(entityId: string): Promise<GeographicEntity | null> {
    const entity = await this.findById(entityId);
    return entity.parentId ? this.findById(entity.parentId) : null;
  }
}
