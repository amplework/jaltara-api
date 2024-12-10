import {Entity, model, property} from '@loopback/repository';

@model()
export class Tutorial extends Entity {
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
  subject: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  videos?: {
    id: string;
    url: string;
    thumbnail: string;
    status: string;
  }[];

  constructor(data?: Partial<Tutorial>) {
    super(data);
  }
}

export interface TutorialRelations {
  // describe navigational properties here
}

export type TutorialWithRelations = Tutorial & TutorialRelations;
