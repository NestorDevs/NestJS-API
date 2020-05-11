import { Injectable } from '@nestjs/common';
import {
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';

const {
  TYPEORM_DATABASE,
  TYPEORM_HOST,
  TYPEORM_PASSWORD,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
} = process.env;

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      autoLoadEntities: true,
      database: TYPEORM_DATABASE,
      entities: ['dist/entities/*.ts'],
      host: TYPEORM_HOST,
      logging: true,
      migrations: ['migrations/*.ts'],
      name: 'default',
      password: TYPEORM_PASSWORD,
      port: Number(TYPEORM_PORT),
      subscribers: ['src/**.module/*-subscriber.ts'],
      synchronize: false,
      type: 'postgres',
      username: TYPEORM_USERNAME,
    };
  }
}
