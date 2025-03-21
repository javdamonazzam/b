import { Module } from '@nestjs/common';
import { TasksServiceController } from './tasks-service.controller';
import { TasksService } from './tasks-service.service';
import { ServiceModule } from '@/service/service.module';
import { ServerModule } from '@/server/server.module';

@Module({
  imports: [ServiceModule ,ServerModule],
  exports: [TasksService],
  controllers: [TasksServiceController],
  providers: [TasksService],
})
export class TasksServiceModule {}
