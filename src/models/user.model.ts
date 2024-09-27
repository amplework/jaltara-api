import {Entity, hasOne, model, property} from '@loopback/repository';
import {UserCredential} from './user-credential.model';

@model({settings: {strict: false}})
export class User extends Entity {
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
    required: false,
  })
  address?: string;

  @property({
    type: 'string',
    required: true,
    index: {unique: true},
  })
  phone?: string;

  @property({
    type: 'string',
    required: true,
    index: {unique: true},
  })
  email?: string;

  @property({
    type: 'string',
    jsonSchema: {
      minLength: 6,
    },
  })
  password?: string;

  @property({
    type: 'string',
  })
  gender?: string;

  @property({
    type: 'string',
  })
  image?: string;

  @property({
    type: 'number',
    default: 0,
  })
  rank?: number;

  @property({
    type: 'number',
    default: 0,
  })
  rating?: number;

  @property({
    type: 'number',
    default: 0,
  })
  points?: number;

  @property({
    type: 'number',
    default: 0,
  })
  selfPoint?: number;

  @property({
    type: 'number',
    default: 0,
  })
  helpPoint?: number;

  @property({
    type: 'string',
    default: 'active',
  })
  status?: string;

  @property({
    type: 'object',
    default: {lat: 0, lng: 0},
  })
  location?: object;

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

  @hasOne(() => UserCredential)
  userCredential: UserCredential;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
