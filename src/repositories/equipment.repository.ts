import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Equipment, EquipmentRelations, Stage, Log} from '../models';
import {StageRepository} from './stage.repository';
import {LogRepository} from './log.repository';

export class EquipmentRepository extends DefaultCrudRepository<
  Equipment,
  typeof Equipment.prototype.id,
  EquipmentRelations
> {

  public readonly stages: HasManyRepositoryFactory<Stage, typeof Equipment.prototype.id>;

  public readonly logs: HasManyRepositoryFactory<Log, typeof Equipment.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('StageRepository') protected stageRepositoryGetter: Getter<StageRepository>, @repository.getter('LogRepository') protected logRepositoryGetter: Getter<LogRepository>,
  ) {
    super(Equipment, dataSource);
    this.logs = this.createHasManyRepositoryFactoryFor('logs', logRepositoryGetter,);
    this.registerInclusionResolver('logs', this.logs.inclusionResolver);
    this.stages = this.createHasManyRepositoryFactoryFor('stages', stageRepositoryGetter,);
    this.registerInclusionResolver('stages', this.stages.inclusionResolver);
  }
}
