import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {ImageUpload, ImageUploadRelations} from '../models';

export class ImageUploadRepository extends DefaultCrudRepository<
  ImageUpload,
  typeof ImageUpload.prototype.id,
  ImageUploadRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(ImageUpload, dataSource);
  }
}
