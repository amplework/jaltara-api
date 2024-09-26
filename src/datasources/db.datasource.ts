import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  name: 'db',
  connector: 'mongodb',
  url: process.env.MONGODB_URL,
  host: process.env.MONGODB_HOST,
  port: +process.env.MONGODB_PORT!,
  user: process.env.MONGODB_USER,
  password: process.env.MONGODB_PASSWORD,
  database: process.env.MONGODB_DATABASE,
  useNewUrlParser: true,
};

@lifeCycleObserver('datasource')
export class DbDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
