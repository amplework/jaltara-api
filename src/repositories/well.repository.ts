import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Well, WellRelations} from '../models';

export class WellRepository extends DefaultCrudRepository<
  Well,
  typeof Well.prototype.id,
  WellRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Well, dataSource);
  }
}
