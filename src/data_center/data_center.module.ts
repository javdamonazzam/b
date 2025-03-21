import { Module } from '@nestjs/common';
import { DataCenterService } from './data_center.service';
import { DataCenterController } from './data_center.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DataCenterController],
  providers: [DataCenterService],
})
export class DataCenterModule {}
