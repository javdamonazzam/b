import { PartialType } from '@nestjs/mapped-types';
import { CreateTasksServiceDto } from './create-tasks-service.dto';

export class UpdateTasksServiceDto extends PartialType(CreateTasksServiceDto) {}
