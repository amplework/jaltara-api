import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Equipment, EquipmentRelations} from '../models';

export class EquipmentRepository extends DefaultCrudRepository<
  Equipment,
  typeof Equipment.prototype.id,
  EquipmentRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Equipment, dataSource);
  }
}
