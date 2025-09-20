import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../modules/users/entities/user.entity';
import { DB_NAME, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './constants';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [User],
  synchronize: true,
};
