import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {UserCode, UserCodeRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class UserCodeRepository extends DefaultCrudRepository<
  UserCode,
  typeof UserCode.prototype.id,
  UserCodeRelations
> {

  public readonly user: BelongsToAccessor<User, typeof UserCode.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(UserCode, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
