import {Entity, hasMany, model, property, belongsTo} from '@loopback/repository';
import {Log} from './log.model';
import {GeographicEntity} from './geographic-entity.model';

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
    required: true,
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

  @hasMany(() => Log)
  logs: Log[];

  @belongsTo(() => GeographicEntity)
  villageId: string;
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
