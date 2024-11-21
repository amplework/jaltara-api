import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {GeographicEntity, Log, Stage, Well, WellRelations} from '../models';
import {GeographicEntityRepository} from './geographic-entity.repository';
import {LogRepository} from './log.repository';
import {StageRepository} from './stage.repository';

export class WellRepository extends DefaultCrudRepository<
  Well,
  typeof Well.prototype.id,
  WellRelations
> {
  public readonly logs: HasManyRepositoryFactory<Log, typeof Well.prototype.id>;

  public readonly village: BelongsToAccessor<
    GeographicEntity,
    typeof Well.prototype.id
  >;

  public readonly stages: HasManyRepositoryFactory<
    Stage,
    typeof Well.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('LogRepository')
    protected logRepositoryGetter: Getter<LogRepository>,
    @repository.getter('GeographicEntityRepository')
    protected geographicEntityRepositoryGetter: Getter<GeographicEntityRepository>,
    @repository.getter('StageRepository')
    protected stageRepositoryGetter: Getter<StageRepository>,
  ) {
    super(Well, dataSource);
    this.stages = this.createHasManyRepositoryFactoryFor(
      'stages',
      stageRepositoryGetter,
    );
    this.registerInclusionResolver('stages', this.stages.inclusionResolver);
    this.village = this.createBelongsToAccessorFor(
      'village',
      geographicEntityRepositoryGetter,
    );
    this.registerInclusionResolver('village', this.village.inclusionResolver);
    this.logs = this.createHasManyRepositoryFactoryFor(
      'logs',
      logRepositoryGetter,
    );
    this.registerInclusionResolver('logs', this.logs.inclusionResolver);
  }
}
