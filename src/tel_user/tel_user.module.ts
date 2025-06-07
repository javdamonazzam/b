import { Module } from '@nestjs/common';
import { TelUserService } from './tel_user.service';
import { TelUserController } from './tel_user.controller';
import { DatabaseModule } from '@/database/database.module';
import { UserModule } from '@/user/user.module';
import { WalletModule } from '@/wallet/wallet.module';
import { ServiceModule } from '@/service/service.module';

@Module({
  imports: [DatabaseModule ,UserModule,ServiceModule, WalletModule],
  controllers: [TelUserController],
  providers: [TelUserService],
})
export class TelUserModule {}
