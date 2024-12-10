import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {GeographicEntity} from './geographic-entity.model';
import {Log} from './log.model';
import {Stage} from './stage.model';

@model({settings: {strict: false}})
export class Well extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  photo?: string;

  @property({
    type: 'string',
    required: false,
  })
  gpsLocation: string;

  @property({
    type: 'number',
    required: true,
  })
  level: number;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  created?: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  modified?: string;

  @hasMany(() => Log)
  logs: Log[];

  @belongsTo(() => GeographicEntity)
  villageId: string;

  @hasMany(() => Stage)
  stages: Stage[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Well>) {
    super(data);
  }
}

export interface WellRelations {
  // describe navigational properties here
}

export type WellWithRelations = Well & WellRelations;
