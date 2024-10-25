import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Stage extends Entity {
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
  pitId: string;

  @property({
    type: 'string',
    required: true,
  })
  stageName: string;

  @property({
    type: 'string',
    required: true,
  })
  photo: string;

  @property({
    type: 'string',
    required: true,
  })
  equipmentId: string;

  @property({
    type: 'string',
  })
  maintenanceType?: string;

  @property({
    type: 'string',
  })
  briefMaintenance?: string;

  @property({
    type: 'string',
    required: true,
  })
  createdBy: string;

  @property({
    type: 'string',
    required: true,
  })
  updatedBy: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Stage>) {
    super(data);
  }
}

export interface StageRelations {
  // describe navigational properties here
}

export type StageWithRelations = Stage & StageRelations;
