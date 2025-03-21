import { Module } from '@nestjs/common';
import { ServiceInfoService } from './service_info.service';
import { ServiceInfoController } from './service_info.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ServiceInfoController],
  providers: [ServiceInfoService],
})
export class ServiceInfoModule {}
