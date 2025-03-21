import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateTasksServiceDto } from './dto/create-tasks-service.dto';
import { UpdateTasksServiceDto } from './dto/update-tasks-service.dto';
import { TasksService } from './tasks-service.service';

@Controller('tasks-service')
export class TasksServiceController {
  constructor(private readonly tasksServiceService: TasksService) {}

}
