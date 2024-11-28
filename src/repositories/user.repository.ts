import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {User, UserRelations, GeographicEntity, Stage} from '../models';
import {GeographicEntityRepository} from './geographic-entity.repository';
import {UserCredentialRepository} from './user-credential.repository';
import {StageRepository} from './stage.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly village: BelongsToAccessor<GeographicEntity, typeof User.prototype.id>;

  public readonly stages: HasManyRepositoryFactory<Stage, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('UserCredentialRepository')
    protected userCredentialRepositoryGetter: Getter<UserCredentialRepository>,
    @repository.getter('GeographicEntityRepository')
    protected geographicEntityRepositoryGetter: Getter<GeographicEntityRepository>, @repository.getter('StageRepository') protected stageRepositoryGetter: Getter<StageRepository>,
  ) {
    super(User, dataSource);
    this.stages = this.createHasManyRepositoryFactoryFor('stages', stageRepositoryGetter,);
    this.registerInclusionResolver('stages', this.stages.inclusionResolver);
    this.village = this.createBelongsToAccessorFor('village', geographicEntityRepositoryGetter,);
    this.registerInclusionResolver('village', this.village.inclusionResolver);
  }
}
