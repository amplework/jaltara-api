import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {FarmersChallenge, FarmersChallengeRelations} from '../models';

export class FarmersChallengeRepository extends DefaultCrudRepository<
  FarmersChallenge,
  typeof FarmersChallenge.prototype.id,
  FarmersChallengeRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(FarmersChallenge, dataSource);
  }
}
