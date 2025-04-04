import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { DatabaseModule } from '@/database/database.module';
import { UserModule } from '@/user/user.module';
import { ServiceModule } from '@/service/service.module';
import { WalletModule } from '@/wallet/wallet.module';

@Module({
  imports: [DatabaseModule, UserModule, ServiceModule, WalletModule],
  controllers: [TelegramController],
  providers: [TelegramService],
})
export class TelegramModule { }
