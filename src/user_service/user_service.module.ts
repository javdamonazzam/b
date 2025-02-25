import { Module } from '@nestjs/common';
import { UserServiceService } from './user_service.service';
import { UserServiceController } from './user_service.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserServiceController],
  providers: [UserServiceService],
})
export class UserServiceModule {}
