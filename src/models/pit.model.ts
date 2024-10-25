import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Farmer} from './farmer.model';

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
    required: true,
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
    required: true,
  })
  stage: string;

  @belongsTo(() => Farmer)
  farmerId: string;
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
