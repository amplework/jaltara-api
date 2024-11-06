import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {Farmer} from './farmer.model';
import {Log} from './log.model';
import {Stage} from './stage.model';

@model({settings: {strict: false}})
export class Pit extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  pitId?: string;

  @property({
    type: 'string',
    required: false,
  })
  photo: string;

  @property({
    type: 'string',
    required: true,
  })
  gpsLocation: string;

  @property({
    type: 'number',
    required: true,
  })
  plotSize: number;

  @property({
    type: 'number',
    required: true,
  })
  level: number;

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

  @belongsTo(() => Farmer)
  farmerId: string;

  @hasMany(() => Stage)
  stages: Stage[];

  @hasMany(() => Log)
  logs: Log[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Pit>) {
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

export interface PitRelations {
  // describe navigational properties here
}

export type PitWithRelations = Pit & PitRelations;
