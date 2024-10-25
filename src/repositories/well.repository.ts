import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Log, Well, WellRelations} from '../models';
import {LogRepository} from './log.repository';

export class WellRepository extends DefaultCrudRepository<
  Well,
  typeof Well.prototype.id,
  WellRelations
> {
  public readonly logs: HasManyRepositoryFactory<Log, typeof Well.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('LogRepository')
    protected logRepositoryGetter: Getter<LogRepository>,
  ) {
    super(Well, dataSource);
    this.logs = this.createHasManyRepositoryFactoryFor(
      'logs',
      logRepositoryGetter,
    );
    this.registerInclusionResolver('logs', this.logs.inclusionResolver);
  }
}
