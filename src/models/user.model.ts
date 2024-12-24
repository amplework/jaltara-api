import {belongsTo, Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {GeographicEntity} from './geographic-entity.model';
import {Stage} from './stage.model';
import {UserCredential} from './user-credential.model';
import {ImageUpload} from './image-upload.model';

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
    required: false,
  })
  email?: string;

  @property({
    type: 'string',
  })
  gender?: string;
  @property({
    type: 'string',
    default: 'active',
  })
  status?: string;

  @property({
    type: 'string',
    required: false,
  })
  language: string;

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

  @belongsTo(() => GeographicEntity)
  villageId: string;

  @hasMany(() => Stage, {keyTo: 'updatedBy'})
  stages: Stage[];

  @hasOne(() => UserCredential)
  userCredential: UserCredential;

  @hasOne(() => ImageUpload, {keyTo: 'moduleId'})
  image: ImageUpload;
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
