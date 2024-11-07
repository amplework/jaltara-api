import {Entity, hasMany, model, property} from '@loopback/repository';
import {Stage} from './stage.model';
import {Log} from './log.model';

@model({settings: {strict: false}})
export class Equipment extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  equipment: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'string',
  })
  photo?: string;

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

  @hasMany(() => Stage)
  stages: Stage[];

  @hasMany(() => Log)
  logs: Log[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Equipment>) {
    super(data);
  }
}

export interface EquipmentRelations {
  // describe navigational properties here
}

export type EquipmentWithRelations = Equipment & EquipmentRelations;
