import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { allConfig as Config } from '../config/config';
import { ExceptionsFilter } from './base/middlewares/exception-handler.filter';
import { TransformInterceptor } from './base/middlewares/transform.interceptor';
import helmet from 'helmet';
import { UserService } from './user/user.service';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'), // از dist/src می‌ره دو پوشه بالا
});
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.use(helmet({ crossOriginResourcePolicy: false }));
  app.useGlobalFilters(new ExceptionsFilter());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  // get service
  const userService = app.get<UserService>(UserService);


  await userService.initialize();
  console.log('ENV LOADED:', process.env.JWT_SECRET);
  await app.listen(8001);
}
bootstrap();