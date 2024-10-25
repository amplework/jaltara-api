import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Stage, StageRelations} from '../models';

export class StageRepository extends DefaultCrudRepository<
  Stage,
  typeof Stage.prototype.id,
  StageRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Stage, dataSource);
  }
}
