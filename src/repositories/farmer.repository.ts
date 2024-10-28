import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Farmer, FarmerRelations, Pit} from '../models';
import {PitRepository} from './pit.repository';

export class FarmerRepository extends DefaultCrudRepository<
  Farmer,
  typeof Farmer.prototype.id,
  FarmerRelations
> {

  public readonly pits: HasManyRepositoryFactory<Pit, typeof Farmer.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PitRepository') protected pitRepositoryGetter: Getter<PitRepository>,
  ) {
    super(Farmer, dataSource);
    this.pits = this.createHasManyRepositoryFactoryFor('pits', pitRepositoryGetter,);
    this.registerInclusionResolver('pits', this.pits.inclusionResolver);
  }
}
