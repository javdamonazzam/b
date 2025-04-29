import { DataSource, DataSourceOptions } from 'typeorm';
import { allConfig as Config } from '../config/config';

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: "78.39.47.173",
  port: 5432,
  username: "vpn1",
  password: "mjm23489687sad",  // رمزعبور دیتابیس
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
