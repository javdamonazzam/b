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
  entities: [__dirname + '/../**/*.entity.js'], 
  migrations: ["dist/src/migrations/*.js"],
  subscribers: [],
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
