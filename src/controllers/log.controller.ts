import {AnyObject, Filter, repository} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {differenceInMinutes, isBefore} from 'date-fns';
import {Log} from '../models';
import {
  EquipmentRepository,
  LogRepository,
  PitRepository,
  WellRepository,
} from '../repositories';

export class LogController {
  constructor(
    @repository(LogRepository)
    public logRepository: LogRepository,

    @repository(PitRepository)
    public pitRepository: PitRepository,

    @repository(EquipmentRepository)
    public equipmentRepository: EquipmentRepository,

    @repository(WellRepository)
    public wellRepository: WellRepository,
  ) {}

  @post('/logs')
  @response(200, {
    description: 'Log model instance',
    content: {'application/json': {schema: getModelSchemaRef(Log)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Log, {
            title: 'NewLog',
            exclude: ['id'],
          }),
        },
      },
    })
    log: Omit<Log, 'id'>,
  ): Promise<AnyObject> {
    const equipmentExists = await this.equipmentRepository.exists(
      log.equipmentId,
    );

    if (!equipmentExists) {
      throw new HttpErrors.NotFound(
        `Equipment ${log.equipmentId} does not exist`,
      );
    }

    // if (log.type === 'pit') {
    //   if (!log.pitId) {
    //     throw new HttpErrors.BadRequest(
    //       'pitId is required when type is "pit".',
    //     );
    //   }
    //   const pitExists = await this.pitRepository.exists(log.pitId);
    //   if (!pitExists) {
    //     throw new HttpErrors.NotFound(`Pit ${log.pitId} does not exist`);
    //   }
    // } else if (log.type === 'well') {
    //   if (!log.wellId) {
    //     throw new HttpErrors.BadRequest(
    //       'wellId is required when type is "well".',
    //     );
    //   }
    //   const wellExists = await this.wellRepository.exists(log.wellId);
    //   if (!wellExists) {
    //     throw new HttpErrors.NotFound(`Well ${log.wellId} does not exist`);
    //   }
    // } else {
    //   throw new HttpErrors.BadRequest(
    //     'Invalid type. Type must be either "pit" or "well".',
    //   );
    // }

    const startTime = new Date(log.startTime);
    // const endTime = new Date(log.endTime);

    // if (isBefore(endTime, startTime)) {
    //   throw new HttpErrors.BadRequest('End time cannot be before start time.');
    // }

    // const totalMinutes = differenceInMinutes(endTime, startTime);
    // const hours = Math.floor(totalMinutes / 60);
    // const minutes = totalMinutes % 60;
    // log.timeRecord = `${hours}:${minutes.toString().padStart(2, '0')} Hrs.`;

    const data = await this.logRepository.create(log);
    return {
      statusCode: 201,
      message: 'Log added successfully',
      data: data,
    };
  }

  @get('/logs')
  @response(200, {
    description: 'Array of Log model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Log, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Log) filter?: Filter<Log>): Promise<any> {
    const data = await this.logRepository.find(filter);
    return {
      statusCode: 200,
      message: 'Log List',
      data: data,
    };
  }

  @get('/logs/{id}')
  @response(200, {
    description: 'Log model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Log, {includeRelations: true}),
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<AnyObject> {
    const data = await this.logRepository.findById(id, {
      include: [
        {
          relation: 'pit',
          scope: {
            fields: {
              id: true,
              pitId: true,
              farmerId: true,
            },
            include: [
              {
                relation: 'farmer',
                scope: {
                  fields: {
                    id: true,
                    name: true,
                    photo: true,
                  },
                },
              },
            ],
          },
        },
      ],
    });
    return {
      statusCode: 200,
      message: "Log's details",
      data: data,
    };
  }

  @patch('/logs/{id}')
  @response(204, {
    description: 'Log PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Log, {partial: true}),
        },
      },
    })
    log: Log,
  ): Promise<any> {
    const logData = await this.logRepository.findById(id);

    if (logData.startTime) {
      const startTime = new Date(logData.startTime);
      const endTime = new Date(log.endTime);

      if (isBefore(endTime, startTime)) {
        throw new HttpErrors.BadRequest(
          'End time cannot be before start time.',
        );
      }

      const totalMinutes = differenceInMinutes(endTime, startTime);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      log.timeRecord = `${hours}:${minutes.toString().padStart(2, '0')} Hrs.`;
    }

    await this.logRepository.updateById(id, log);
    return {
      statusCode: 200,
      message: 'Log updated successfully',
    };
  }

  @del('/logs/{id}')
  @response(204, {
    description: 'Log DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<any> {
    await this.logRepository.deleteById(id);
    return {
      statusCode: 200,
      message: 'Log deleted successfully',
    };
  }
}
