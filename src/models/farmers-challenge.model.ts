import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class FarmersChallenge extends Entity {
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
  challenge: string;

  @property({
    type: 'string',
  })
  status?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<FarmersChallenge>) {
    super(data);
  }
}

export interface FarmersChallengeRelations {
  // describe navigational properties here
}

export type FarmersChallengeWithRelations = FarmersChallenge & FarmersChallengeRelations;
