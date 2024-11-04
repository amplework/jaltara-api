import {Entity, model, property} from '@loopback/repository';

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

  @property({
    type: 'string',
  })
  parentId?: string; // Self-referencing parent id for hierarchical relationships

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
