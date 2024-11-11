import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {Farmer} from './farmer.model';
import {Log} from './log.model';
import {Stage} from './stage.model';

@model({settings: {strict: false}})
export class Pit extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  pitId?: string;

  @property({
    type: 'string',
    required: false,
  })
  photo: string;

  @property({
    type: 'string',
    required: true,
  })
  gpsLocation: string;

  @property({
    type: 'number',
    required: true,
  })
  plotSize: number;

  @property({
    type: 'string',
    jsonSchema: {
      enum: ['marking', 'digging', 'filling', 'maintenance'],
    },
  })
  stageName: string;

  @property({
    type: 'number',
    required: true,
  })
  level: number;

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

  @belongsTo(() => Farmer)
  farmerId: string;

  @hasMany(() => Stage)
  stages: Stage[];

  @hasMany(() => Log)
  logs: Log[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Pit>) {
    super(data);
  }
}

export interface PitRelations {
  // describe navigational properties here
}

export type PitWithRelations = Pit & PitRelations;
