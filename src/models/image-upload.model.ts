import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class ImageUpload extends Entity {
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
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  url: string;

  @property({
    type: 'string',
  })
  moduleId: string;

  @property({
    type: 'string',
  })
  status?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ImageUpload>) {
    super(data);
  }
}

export interface ImageUploadRelations {
  // describe navigational properties here
}

export type ImageUploadWithRelations = ImageUpload & ImageUploadRelations;
