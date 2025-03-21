import { Module } from '@nestjs/common';
import { NewAccoutService } from './new_accout.service';
import { NewAccoutController } from './new_accout.controller';
import { DatabaseModule } from '@/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NewAccoutController],
  providers: [NewAccoutService],
})
export class NewAccoutModule {}
