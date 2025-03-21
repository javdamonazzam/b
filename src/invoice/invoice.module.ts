import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { DatabaseModule } from 'src/database/database.module';
import { WalletModule } from '@/wallet/wallet.module';

@Module({
  imports: [DatabaseModule ,WalletModule],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
