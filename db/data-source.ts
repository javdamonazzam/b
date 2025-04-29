import { DataSource, DataSourceOptions } from 'typeorm';
import { allConfig as Config } from '../config/config';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: Config.database.db_host,
  username: Config.database.db_username,
  password: Config.database.db_password,
  database: Config.database.db_name,
  port: +Config.database.db_port,
  synchronize: true,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: ['dist/db/migrations/*js'],
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
