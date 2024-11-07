import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Log, LogRelations, Equipment, Pit, Well} from '../models';
import {EquipmentRepository} from './equipment.repository';
import {PitRepository} from './pit.repository';
import {WellRepository} from './well.repository';

export class LogRepository extends DefaultCrudRepository<
  Log,
  typeof Log.prototype.id,
  LogRelations
> {

  public readonly equipment: BelongsToAccessor<Equipment, typeof Log.prototype.id>;

  public readonly pit: BelongsToAccessor<Pit, typeof Log.prototype.id>;

  public readonly well: BelongsToAccessor<Well, typeof Log.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('EquipmentRepository') protected equipmentRepositoryGetter: Getter<EquipmentRepository>, @repository.getter('PitRepository') protected pitRepositoryGetter: Getter<PitRepository>, @repository.getter('WellRepository') protected wellRepositoryGetter: Getter<WellRepository>,
  ) {
    super(Log, dataSource);
    this.well = this.createBelongsToAccessorFor('well', wellRepositoryGetter,);
    this.registerInclusionResolver('well', this.well.inclusionResolver);
    this.pit = this.createBelongsToAccessorFor('pit', pitRepositoryGetter,);
    this.registerInclusionResolver('pit', this.pit.inclusionResolver);
    this.equipment = this.createBelongsToAccessorFor('equipment', equipmentRepositoryGetter,);
    this.registerInclusionResolver('equipment', this.equipment.inclusionResolver);
  }
}
