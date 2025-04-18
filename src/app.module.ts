import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ServiceModule } from './service/service.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';

import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { ScheduleModule } from '@nestjs/schedule';

import { RolesGuard } from './auth/guards/role.guard';
import { ServerModule } from './server/server.module';
import { WalletModule } from './wallet/wallet.module';
import { InvoiceModule } from './invoice/invoice.module';
import { TasksServiceModule } from './tasks-service/tasks-service.module';
import { TelegramService } from './telegram/telegram.service';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [
    UserModule,
    ServerModule,
    DatabaseModule,
    WalletModule,
    InvoiceModule,
    ServiceModule,
    AuthModule,
    ScheduleModule.forRoot(),
    TasksServiceModule,
    TelegramModule,
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
    TelegramService,
  ],
})
export class AppModule {}
