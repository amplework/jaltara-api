import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Equipment, EquipmentRelations, Stage} from '../models';
import {StageRepository} from './stage.repository';

export class EquipmentRepository extends DefaultCrudRepository<
  Equipment,
  typeof Equipment.prototype.id,
  EquipmentRelations
> {

  public readonly stages: HasManyRepositoryFactory<Stage, typeof Equipment.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('StageRepository') protected stageRepositoryGetter: Getter<StageRepository>,
  ) {
    super(Equipment, dataSource);
    this.stages = this.createHasManyRepositoryFactoryFor('stages', stageRepositoryGetter,);
    this.registerInclusionResolver('stages', this.stages.inclusionResolver);
  }
}
