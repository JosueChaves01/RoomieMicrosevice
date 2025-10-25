import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RoomieEntity } from '../adapters/outbound/persistence/typeorm/entities/roomie.typeorm-entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgresql://citus:Roomiefy2301@c-roomies-postgres-db.t66x6mz43vydno.postgres.cosmos.azure.com:5432/roomies_db?sslmode=require',
  entities: [RoomieEntity],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.LOG_LEVEL === 'debug',
  ssl: {
    rejectUnauthorized: false
  },
  extra: {
    connectionTimeoutMillis: 15000,
    idleTimeoutMillis: 15000,
  }
};

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgresql://citus:Roomiefy2301@c-roomies-postgres-db.t66x6mz43vydno.postgres.cosmos.azure.com:5432/roomies_db?sslmode=require',
  entities: [RoomieEntity],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.LOG_LEVEL === 'debug',
  ssl: {
    rejectUnauthorized: false
  },
});
