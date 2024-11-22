import {Entity, hasMany, model, property, belongsTo} from '@loopback/repository';
import {Pit} from './pit.model';
import {GeographicEntity} from './geographic-entity.model';

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
    type: 'number',
    required: true,
  })
  land: number;

  @property({
    type: 'number',
    required: true,
  })
  familyMemberNumber: number;

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

  @hasMany(() => Pit)
  pits: Pit[];

  @belongsTo(() => GeographicEntity)
  villageId: string;
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
