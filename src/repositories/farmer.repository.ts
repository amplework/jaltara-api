import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Farmer, FarmerRelations} from '../models';

export class FarmerRepository extends DefaultCrudRepository<
  Farmer,
  typeof Farmer.prototype.id,
  FarmerRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Farmer, dataSource);
  }
}
