import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {Farmer} from './farmer.model';

@model({settings: {strict: false}})
export class GeographicEntity extends Entity {
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
    jsonSchema: {
      enum: ['state', 'district', 'taluk', 'village'],
    },
  })
  entityType: 'state' | 'district' | 'taluk' | 'village';

  @belongsTo(() => GeographicEntity, {name: 'parent'})
  parentId?: string;

  @hasMany(() => GeographicEntity, {keyTo: 'parentId'})
  children: GeographicEntity[];

  @hasMany(() => Farmer, {keyTo: 'villageId'})
  farmers: Farmer[];
  [prop: string]: any;

  constructor(data?: Partial<GeographicEntity>) {
    super(data);
  }
}

export interface GeographicEntityRelations {
  // describe navigational properties here
}

export type GeographicEntityWithRelations = GeographicEntity &
  GeographicEntityRelations;
