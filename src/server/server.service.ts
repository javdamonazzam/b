import { Injectable } from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { BaseCrudService } from 'src/base';
import { Server } from './entities/server.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServerService extends BaseCrudService<Server> {
  constructor(
    @InjectRepository(Server)
    protected serverRepository: Repository<Server>,
  ) {
    super(serverRepository);
  }
  async findByuser(userId: number): Promise<Server[]> {
    return this.serverRepository.find({
      where:{
        users:{id:userId}
      },
      relations:{
        users:true,
      }
    })
  }
}
