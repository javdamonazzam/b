import { config } from 'dotenv';

config();

export const allConfig = {
  database: {
    db_host: process.env.POSTGRES_HOST,
    db_username: process.env.POSTGRES_USER,
    db_password: process.env.POSTGRES_PASSWORD,
    db_name: process.env.POSTGRES_DB,
    db_port: process.env.POSTGRES_PORT,
  },
  setting: {
    port: process.env.APP_PORT || 1111,
  },
  jwt: {
    secret: 'ad12@!!!jjjj',
  },
  security: {
    name: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
};
