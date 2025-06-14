import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ServiceModule } from './service/service.module';
import { DiscountCodeModule } from './discount_code/discount_code.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';

import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { ScheduleModule } from '@nestjs/schedule';

import { RolesGuard } from './auth/guards/role.guard';
import { NewAccoutModule } from './new_accout/new_accout.module';
import { ServerModule } from './server/server.module';
import { WalletModule } from './wallet/wallet.module';
import { InvoiceModule } from './invoice/invoice.module';
import { TasksServiceModule } from './tasks-service/tasks-service.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ZarinpalModule } from './zarinpal/zarinpal.module';
import { TelUserModule } from './tel_user/tel_user.module';

@Module({
  imports: [
    UserModule,
    ServerModule,
    DatabaseModule,
    WalletModule,
    InvoiceModule,
    ServiceModule,
    AuthModule,
    // NewAccoutModule,
    TelUserModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true, // برای اینکه همه جا در دسترس باشد
      envFilePath: join(__dirname, '../.env'), // مسیر مطلق
      ignoreEnvFile: false, // مطمئن شوید false است
    }),
    TasksServiceModule,
    ZarinpalModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
