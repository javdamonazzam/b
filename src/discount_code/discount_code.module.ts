import { Module } from '@nestjs/common';
import { DiscountCodeService } from './discount_code.service';
import { DiscountCodeController } from './discount_code.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DiscountCodeController],
  providers: [DiscountCodeService],
})
export class DiscountCodeModule {}
