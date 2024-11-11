import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Log, Well, WellRelations, GeographicEntity} from '../models';
import {LogRepository} from './log.repository';
import {GeographicEntityRepository} from './geographic-entity.repository';

export class WellRepository extends DefaultCrudRepository<
  Well,
  typeof Well.prototype.id,
  WellRelations
> {
  public readonly logs: HasManyRepositoryFactory<Log, typeof Well.prototype.id>;

  public readonly village: BelongsToAccessor<GeographicEntity, typeof Well.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('LogRepository')
    protected logRepositoryGetter: Getter<LogRepository>, @repository.getter('GeographicEntityRepository') protected geographicEntityRepositoryGetter: Getter<GeographicEntityRepository>,
  ) {
    super(Well, dataSource);
    this.village = this.createBelongsToAccessorFor('village', geographicEntityRepositoryGetter,);
    this.registerInclusionResolver('village', this.village.inclusionResolver);
    this.logs = this.createHasManyRepositoryFactoryFor(
      'logs',
      logRepositoryGetter,
    );
    this.registerInclusionResolver('logs', this.logs.inclusionResolver);
  }
}
