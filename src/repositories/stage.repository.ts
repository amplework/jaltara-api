import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Stage, StageRelations, User, Pit, Well} from '../models';
import {UserRepository} from './user.repository';
import {PitRepository} from './pit.repository';
import {WellRepository} from './well.repository';

export class StageRepository extends DefaultCrudRepository<
  Stage,
  typeof Stage.prototype.id,
  StageRelations
> {

  public readonly updatedbySevek: BelongsToAccessor<User, typeof Stage.prototype.id>;

  public readonly pit: BelongsToAccessor<Pit, typeof Stage.prototype.id>;

  public readonly well: BelongsToAccessor<Well, typeof Stage.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('PitRepository') protected pitRepositoryGetter: Getter<PitRepository>, @repository.getter('WellRepository') protected wellRepositoryGetter: Getter<WellRepository>,
  ) {
    super(Stage, dataSource);
    this.well = this.createBelongsToAccessorFor('well', wellRepositoryGetter,);
    this.registerInclusionResolver('well', this.well.inclusionResolver);
    this.pit = this.createBelongsToAccessorFor('pit', pitRepositoryGetter,);
    this.registerInclusionResolver('pit', this.pit.inclusionResolver);
    this.updatedbySevek = this.createBelongsToAccessorFor('updatedbySevek', userRepositoryGetter,);
    this.registerInclusionResolver('updatedbySevek', this.updatedbySevek.inclusionResolver);
  }
}
