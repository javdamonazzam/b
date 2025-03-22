import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "vpn",
  password: "1312",  // رمزعبور دیتابیس
  database: "vpn",
  synchronize: false,
  logging: false,
  migrations: ["dist/migrations/*.js"],  
  subscribers: [],
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
