import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'Localhost',
  username: 'vpn',
  password: String(1312),
  database: 'vpn',
  port: 5432,
  synchronize: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*js'],
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
