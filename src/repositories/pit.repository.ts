import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Pit, PitRelations, Farmer} from '../models';
import {FarmerRepository} from './farmer.repository';

export class PitRepository extends DefaultCrudRepository<
  Pit,
  typeof Pit.prototype.id,
  PitRelations
> {

  public readonly farmer: BelongsToAccessor<Farmer, typeof Pit.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('FarmerRepository') protected farmerRepositoryGetter: Getter<FarmerRepository>,
  ) {
    super(Pit, dataSource);
    this.farmer = this.createBelongsToAccessorFor('farmer', farmerRepositoryGetter,);
    this.registerInclusionResolver('farmer', this.farmer.inclusionResolver);
  }
}
