import { Injectable } from '@nestjs/common';
import { CreateNewAccoutDto } from './dto/create-new_accout.dto';
import { UpdateNewAccoutDto } from './dto/update-new_accout.dto';
import { BaseCrudService } from '@/base';
import { InjectRepository } from '@nestjs/typeorm';
import { NewAccout } from './entities/new_accout.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewAccoutService extends BaseCrudService<NewAccout> {
  constructor(
    @InjectRepository(NewAccout)
    public serverRepository: Repository<NewAccout>,
  ) {
    super(serverRepository);
  }
}
