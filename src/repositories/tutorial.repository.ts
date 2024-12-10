import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Tutorial, TutorialRelations} from '../models';

export class TutorialRepository extends DefaultCrudRepository<
  Tutorial,
  typeof Tutorial.prototype.id,
  TutorialRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Tutorial, dataSource);
  }
}
