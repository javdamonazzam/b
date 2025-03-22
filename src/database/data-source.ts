import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "vpn",
  password: "1312",  // رمزعبور دیتابیس
  database: "vpn",
  synchronize: true,
  logging: true,
  migrations: ["dist/src/migrations/*.js"],
  entities: [__dirname + '/../**/*.entity.js'], 
  subscribers: [],
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
