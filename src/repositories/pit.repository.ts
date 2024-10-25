import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Pit, PitRelations, Farmer, Stage} from '../models';
import {FarmerRepository} from './farmer.repository';
import {StageRepository} from './stage.repository';

export class PitRepository extends DefaultCrudRepository<
  Pit,
  typeof Pit.prototype.id,
  PitRelations
> {

  public readonly farmer: BelongsToAccessor<Farmer, typeof Pit.prototype.id>;

  public readonly stages: HasManyRepositoryFactory<Stage, typeof Pit.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('FarmerRepository') protected farmerRepositoryGetter: Getter<FarmerRepository>, @repository.getter('StageRepository') protected stageRepositoryGetter: Getter<StageRepository>,
  ) {
    super(Pit, dataSource);
    this.stages = this.createHasManyRepositoryFactoryFor('stages', stageRepositoryGetter,);
    this.registerInclusionResolver('stages', this.stages.inclusionResolver);
    this.farmer = this.createBelongsToAccessorFor('farmer', farmerRepositoryGetter,);
    this.registerInclusionResolver('farmer', this.farmer.inclusionResolver);
  }
}
