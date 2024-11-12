import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {
  Farmer,
  GeographicEntity,
  Log,
  Pit,
  PitRelations,
  Stage,
} from '../models';
import {FarmerRepository} from './farmer.repository';
import {GeographicEntityRepository} from './geographic-entity.repository';
import {LogRepository} from './log.repository';
import {StageRepository} from './stage.repository';

export class PitRepository extends DefaultCrudRepository<
  Pit,
  typeof Pit.prototype.id,
  PitRelations
> {
  public readonly farmer: BelongsToAccessor<Farmer, typeof Pit.prototype.id>;

  public readonly stages: HasManyRepositoryFactory<
    Stage,
    typeof Pit.prototype.id
  >;

  public readonly logs: HasManyRepositoryFactory<Log, typeof Pit.prototype.id>;

  public readonly village: BelongsToAccessor<
    GeographicEntity,
    typeof Pit.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('FarmerRepository')
    protected farmerRepositoryGetter: Getter<FarmerRepository>,
    @repository.getter('StageRepository')
    protected stageRepositoryGetter: Getter<StageRepository>,
    @repository.getter('LogRepository')
    protected logRepositoryGetter: Getter<LogRepository>,
    @repository.getter('GeographicEntityRepository')
    protected geographicEntityRepositoryGetter: Getter<GeographicEntityRepository>,
  ) {
    super(Pit, dataSource);
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
    this.stages = this.createHasManyRepositoryFactoryFor(
      'stages',
      stageRepositoryGetter,
    );
    this.registerInclusionResolver('stages', this.stages.inclusionResolver);
    this.farmer = this.createBelongsToAccessorFor(
      'farmer',
      farmerRepositoryGetter,
    );
    this.registerInclusionResolver('farmer', this.farmer.inclusionResolver);
  }
}
