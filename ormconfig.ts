const {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} = process.env;

export = {
  database: DB_DATABASE,
  entities: ['src/entities/*.ts'],
  host: DB_HOST,
  logging: true,
  migrations: ['src/migrations/*.ts'],
  name: 'default',
  password: DB_PASSWORD,
  port: DB_PORT,
  subscribers: ['src/**.module/*-subscriber.ts'],
  synchronize: false,
  type: 'postgres',
  username: DB_USERNAME,
}
