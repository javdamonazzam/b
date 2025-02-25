import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ServerModule } from '@/server/server.module';
import { UserModule } from '@/user/user.module';
import { WalletModule } from '@/wallet/wallet.module';

@Module({
  imports: [DatabaseModule, ServerModule, UserModule, WalletModule],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
