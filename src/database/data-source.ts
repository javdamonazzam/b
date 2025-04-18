import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: "sabalan.liara.cloud",
  port: 30038,
  username: "root",
  password: "Bov37UnnMMUQ35VT178r7FFW",  // رمزعبور دیتابیس
  database: "postgres",
  // synchronize: true,
  logging: false
  ,
  entities: [__dirname + '/../**/*.entity.js'], 
  migrations: ["dist/src/migrations/*.js"],
  subscribers: [],
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
