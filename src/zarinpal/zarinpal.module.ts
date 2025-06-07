import { Module } from '@nestjs/common';
import { ZarinpalService } from './zarinpal.service';
import { ZarinpalController } from './zarinpal.controller';

@Module({
  controllers: [ZarinpalController],
  providers: [ZarinpalService],
})
export class ZarinpalModule {}
