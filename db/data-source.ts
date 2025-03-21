import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'Localhost',
  username: 'vpn',
  password: String(1312),
  database: 'vpn',
  port: 5432,
  synchronize: true,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],  
  migrations: [__dirname + '/../db/migrations/*.{js,ts}'],
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
