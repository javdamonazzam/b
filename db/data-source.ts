import { DataSource, DataSourceOptions } from 'typeorm';
import { allConfig as Config } from '../config/config';

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: "78.38.53.49",
  port: 5432,
  username: "vpnuser",
  password: "mj12345678",  // رمزعبور دیتابیس
  database: "vpn_backup",
  // synchronize: true,
  logging: false
  ,
  entities: [__dirname + '/../**/*.entity.js'], 
  migrations: ["dist/src/migrations/*.js"],
  subscribers: [],
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
