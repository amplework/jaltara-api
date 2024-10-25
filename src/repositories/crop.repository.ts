import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Crop, CropRelations} from '../models';

export class CropRepository extends DefaultCrudRepository<
  Crop,
  typeof Crop.prototype.id,
  CropRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Crop, dataSource);
  }
}
