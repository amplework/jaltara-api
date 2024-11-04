import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasOneRepositoryFactory,
  repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {User, UserCredential, UserRelations, GeographicEntity} from '../models';
import {UserCredentialRepository} from './user-credential.repository';
import {GeographicEntityRepository} from './geographic-entity.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly userCredential: HasOneRepositoryFactory<
    UserCredential,
    typeof User.prototype.id
  >;

  public readonly geographic: BelongsToAccessor<GeographicEntity, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('UserCredentialRepository')
    protected userCredentialRepositoryGetter: Getter<UserCredentialRepository>, @repository.getter('GeographicEntityRepository') protected geographicEntityRepositoryGetter: Getter<GeographicEntityRepository>,
  ) {
    super(User, dataSource);
    this.geographic = this.createBelongsToAccessorFor('geographic', geographicEntityRepositoryGetter,);
    this.registerInclusionResolver('geographic', this.geographic.inclusionResolver);
    this.userCredential = this.createHasOneRepositoryFactoryFor(
      'userCredential',
      userCredentialRepositoryGetter,
    );
    this.registerInclusionResolver(
      'userCredential',
      this.userCredential.inclusionResolver,
    );
  }
  async findCredentials(
    userId: typeof User.prototype.id,
  ): Promise<UserCredential | undefined> {
    try {
      return await this.userCredential(userId).get();
    } catch (err: any) {
      if (err && err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
