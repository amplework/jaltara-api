import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Crop extends Entity {
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
  status: string;

  @property({
    type: 'string',
  })
  photo?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Crop>) {
    super(data);
  }
}

export interface CropRelations {
  // describe navigational properties here
}

export type CropWithRelations = Crop & CropRelations;
