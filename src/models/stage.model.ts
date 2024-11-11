import {Entity, model, property} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';

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
    jsonSchema: {
      enum: ['marking', 'digging', 'filling', 'maintenance'],
    },
  })
  stageName: string;

  @property({
    type: 'string',
    required: true,
  })
  photo: string;

  @property({
    type: 'string',
    required: false,
  })
  equipmentId?: string;

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
    required: false,
  })
  updatedBy?: string;

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

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Stage>) {
    super(data);
    this.validateConditionalFields(data);
  }

  private validateConditionalFields(data?: Partial<Stage>) {
    if (data?.stageName === 'digging' && !data?.equipmentId) {
      throw new HttpErrors.UnprocessableEntity(
        'equipmentId is required when stageName is "digging".',
      );
    }
    if (data?.stageName === 'maintenance') {
      if (!data?.maintenanceType) {
        throw new HttpErrors.UnprocessableEntity(
          'maintenanceType is required when stageName is "maintenance".',
        );
      }
      if (!data?.briefMaintenance) {
        throw new HttpErrors.UnprocessableEntity(
          'briefMaintenance is required when stageName is "maintenance".',
        );
      }
    }
  }
}
export interface StageRelations {
  // describe navigational properties here
}

export type StageWithRelations = Stage & StageRelations;
