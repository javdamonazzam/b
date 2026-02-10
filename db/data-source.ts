import { DataSource, DataSourceOptions } from 'typeorm';
import { allConfig as Config } from '../config/config';

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: "38.134.148.15",
  port: 5432,
  username: "vpnuser",
  password: "121314",  // رمزعبور دیتابیس
  database: "vpn_backup",
  // synchronize: true,
  logging: false,
  entities: [__dirname + '/../**/*.entity.js'], 
  migrations: ["dist/src/migrations/*.js"],
  subscribers: [],
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
