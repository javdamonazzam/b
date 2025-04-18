import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: "84.200.154.221",
  port: 5433,
  username: "vpn1",
  password: "1213",  // رمزعبور دیتابیس
  database: "vpn",
  // synchronize: true,
  logging: false
  ,
  entities: [__dirname + '/../**/*.entity.js'], 
  migrations: ["dist/src/migrations/*.js"],
  subscribers: [],
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
