import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {GeographicEntity, GeographicEntityRelations, Farmer} from '../models';
import {FarmerRepository} from './farmer.repository';

export class GeographicEntityRepository extends DefaultCrudRepository<
  GeographicEntity,
  typeof GeographicEntity.prototype.id,
  GeographicEntityRelations
> {

  public readonly farmers: HasManyRepositoryFactory<Farmer, typeof GeographicEntity.prototype.id>;

  constructor(@inject('datasources.db') dataSource: DbDataSource, @repository.getter('FarmerRepository') protected farmerRepositoryGetter: Getter<FarmerRepository>,) {
    super(GeographicEntity, dataSource);
    this.farmers = this.createHasManyRepositoryFactoryFor('farmers', farmerRepositoryGetter,);
    this.registerInclusionResolver('farmers', this.farmers.inclusionResolver);
  }

  async findChildren(parentId: string): Promise<GeographicEntity[]> {
    return this.find({where: {parentId}});
  }

  async findParent(entityId: string): Promise<GeographicEntity | null> {
    const entity = await this.findById(entityId);
    return entity.parentId ? this.findById(entity.parentId) : null;
  }
}
