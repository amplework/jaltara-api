import {Entity, model, property} from '@loopback/repository';

@model()
export class Village extends Entity {
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
    type: 'object',
    required: true,
  })
  address: object;

  @property({
    type: 'object',
    default: {lat: 0, lng: 0},
  })
  location?: object;

  @property({
    type: 'number',
    default: 1,
  })
  status?: number;

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

  constructor(data?: Partial<Village>) {
    super(data);
  }
}

export interface VillageRelations {
  // describe navigational properties here
}

export type VillageWithRelations = Village & VillageRelations;
