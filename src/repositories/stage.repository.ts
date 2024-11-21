import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Stage, StageRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class StageRepository extends DefaultCrudRepository<
  Stage,
  typeof Stage.prototype.id,
  StageRelations
> {

  public readonly updatedbySevek: BelongsToAccessor<User, typeof Stage.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Stage, dataSource);
    this.updatedbySevek = this.createBelongsToAccessorFor('updatedbySevek', userRepositoryGetter,);
    this.registerInclusionResolver('updatedbySevek', this.updatedbySevek.inclusionResolver);
  }
}
