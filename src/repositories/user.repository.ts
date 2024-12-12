import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository, HasOneRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {GeographicEntity, Stage, User, UserRelations, UserCredential} from '../models';
import {GeographicEntityRepository} from './geographic-entity.repository';
import {StageRepository} from './stage.repository';
import {UserCredentialRepository} from './user-credential.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly village: BelongsToAccessor<
    GeographicEntity,
    typeof User.prototype.id
  >;

  public readonly stages: HasManyRepositoryFactory<
    Stage,
    typeof User.prototype.id
  >;

  public readonly userCredential: HasOneRepositoryFactory<UserCredential, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('UserCredentialRepository')
    protected userCredentialRepositoryGetter: Getter<UserCredentialRepository>,
    @repository.getter('GeographicEntityRepository')
    protected geographicEntityRepositoryGetter: Getter<GeographicEntityRepository>,
    @repository.getter('StageRepository')
    protected stageRepositoryGetter: Getter<StageRepository>,
  ) {
    super(User, dataSource);
    this.userCredential = this.createHasOneRepositoryFactoryFor('userCredential', userCredentialRepositoryGetter);
    this.registerInclusionResolver('userCredential', this.userCredential.inclusionResolver);
    this.stages = this.createHasManyRepositoryFactoryFor(
      'stages',
      stageRepositoryGetter,
    );
    this.registerInclusionResolver('stages', this.stages.inclusionResolver);
    this.village = this.createBelongsToAccessorFor(
      'village',
      geographicEntityRepositoryGetter,
    );
    this.registerInclusionResolver('village', this.village.inclusionResolver);
  }

  async findByName(name: string): Promise<User[]> {
    const filter = {
      name: {
        $regex: `^${name}`,
        $options: 'i',
      },
    };
    return this.dataSource.connector?.collection('User').find(filter).toArray();
  }
}
