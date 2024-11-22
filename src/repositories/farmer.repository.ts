import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Farmer, FarmerRelations, Pit, GeographicEntity} from '../models';
import {PitRepository} from './pit.repository';
import {GeographicEntityRepository} from './geographic-entity.repository';

export class FarmerRepository extends DefaultCrudRepository<
  Farmer,
  typeof Farmer.prototype.id,
  FarmerRelations
> {

  public readonly pits: HasManyRepositoryFactory<Pit, typeof Farmer.prototype.id>;

  public readonly village: BelongsToAccessor<GeographicEntity, typeof Farmer.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PitRepository') protected pitRepositoryGetter: Getter<PitRepository>, @repository.getter('GeographicEntityRepository') protected geographicEntityRepositoryGetter: Getter<GeographicEntityRepository>,
  ) {
    super(Farmer, dataSource);
    this.village = this.createBelongsToAccessorFor('village', geographicEntityRepositoryGetter,);
    this.registerInclusionResolver('village', this.village.inclusionResolver);
    this.pits = this.createHasManyRepositoryFactoryFor('pits', pitRepositoryGetter,);
    this.registerInclusionResolver('pits', this.pits.inclusionResolver);
  }
}
