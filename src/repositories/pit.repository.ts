import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Pit, PitRelations} from '../models';

export class PitRepository extends DefaultCrudRepository<
  Pit,
  typeof Pit.prototype.id,
  PitRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Pit, dataSource);
  }
}
