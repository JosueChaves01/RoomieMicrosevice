import { DataSourceOptions } from 'typeorm';
import { RoomieEntity } from '../../adapters/outbound/persistence/typeorm/entities/roomie.typeorm-entity';

export const TypeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'admin',
  database: process.env.POSTGRES_DB || 'roomies_db',
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  synchronize: true, // Para desarrollo - crea tablas automáticamente
  logging: true, // Para ver las consultas SQL
};
