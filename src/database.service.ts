import { Injectable } from '@nestjs/common';
import {
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';

const {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} = process.env;

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      autoLoadEntities: true,
      database: DB_DATABASE,
      entities: ['dist/entities/*.ts'],
      host: DB_HOST,
      logging: true,
      migrations: ['migrations/*.ts'],
      name: 'default',
      password: DB_PASSWORD,
      port: Number(DB_PORT),
      subscribers: ['src/**.module/*-subscriber.ts'],
      synchronize: false,
      type: 'postgres',
      username: DB_USERNAME,
    };
  }
}
