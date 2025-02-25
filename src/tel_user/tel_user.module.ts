import { Module } from '@nestjs/common';
import { TelUserService } from './tel_user.service';
import { TelUserController } from './tel_user.controller';
import { DatabaseModule } from '@/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TelUserController],
  providers: [TelUserService],
})
export class TelUserModule {}
