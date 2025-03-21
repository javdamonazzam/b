import { Injectable } from '@nestjs/common';
import { CreateUserServiceDto } from './dto/create-user_service.dto';
import { UpdateUserServiceDto } from './dto/update-user_service.dto';
import { BaseCrudService } from 'src/base';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from './entities/user_service.entity';

@Injectable()
export class UserServiceService extends BaseCrudService<UserService> {
  constructor(
    @InjectRepository(UserService)
    protected userServiceRepository: Repository<CreateUserServiceDto>,
  ) {
    super(userServiceRepository);
  }
}
