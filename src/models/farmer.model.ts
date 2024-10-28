import {Entity, model, property, hasMany} from '@loopback/repository';
import {Pit} from './pit.model';

@model({settings: {strict: false}})
export class Farmer extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

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
  phone: string;

  @property({
    type: 'string',
  })
  photo?: string;

  @property({
    type: 'string',
    required: true,
  })
  village: string;

  @property({
    type: 'number',
    required: true,
  })
  land: number;

  @property({
    type: 'string',
  })
  crops?: string;

  @property({
    type: 'number',
    required: true,
  })
  familyMemberNumber: number;

  @property({
    type: 'string',
  })
  farmingChallenge?: string;

  @property({
    type: 'string',
    required: true,
  })
  farmAvailableDate: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isParticipate: boolean;

  @property({
    type: 'string',
    required: true,
  })
  language: string;

  @hasMany(() => Pit)
  pits: Pit[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Farmer>) {
    super(data);
  }
}

export interface FarmerRelations {
  // describe navigational properties here
}

export type FarmerWithRelations = Farmer & FarmerRelations;
