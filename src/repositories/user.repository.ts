import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {User, UserRelations, GeographicEntity} from '../models';
import {GeographicEntityRepository} from './geographic-entity.repository';
import {UserCredentialRepository} from './user-credential.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly village: BelongsToAccessor<GeographicEntity, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('UserCredentialRepository')
    protected userCredentialRepositoryGetter: Getter<UserCredentialRepository>,
    @repository.getter('GeographicEntityRepository')
    protected geographicEntityRepositoryGetter: Getter<GeographicEntityRepository>,
  ) {
    super(User, dataSource);
    this.village = this.createBelongsToAccessorFor('village', geographicEntityRepositoryGetter,);
    this.registerInclusionResolver('village', this.village.inclusionResolver);
  }
}
