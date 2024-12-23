import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Equipment} from './equipment.model';
import {Pit} from './pit.model';
import {User} from './user.model';
import {Well} from './well.model';

@model({settings: {strict: false}})
export class Log extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: false,
  })
  photoCheckIn: string;

  @property({
    type: 'string',
    required: false,
  })
  photoCheckOut: string;

  @property({
    type: 'string',
    required: false,
  })
  meterReadingCheckIn: string;

  @property({
    type: 'string',
    required: false,
  })
  meterReadingCheckout: string;

  @property({
    type: 'string',
  })
  totalUsages: string;

  @property({
    type: 'date',
    required: true,
  })
  startTime: string;

  @property({
    type: 'date',
    required: false,
  })
  endTime: string;

  @property({
    type: 'string',
  })
  timeRecord: string;

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

  @belongsTo(() => Equipment)
  equipmentId: string;

  @belongsTo(() => Pit)
  pitId: string;

  @belongsTo(() => Well)
  wellId: string;

  @belongsTo(() => User, {name: 'updatedBySevek'})
  updatedBy: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Log>) {
    super(data);
  }
}

export interface LogRelations {
  // describe navigational properties here
}

export type LogWithRelations = Log & LogRelations;
