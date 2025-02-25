import { Injectable } from '@nestjs/common';
import { CreateServiceTypeDto } from './dto/create-service_type.dto';
import { UpdateServiceTypeDto } from './dto/update-service_type.dto';
import { BaseCrudService } from 'src/base';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceType } from './entities/service_type.entity';

@Injectable()
export class ServiceTypeService extends BaseCrudService<ServiceType> {
  constructor(
    @InjectRepository(ServiceType)
    protected ipTypeRepository: Repository<ServiceType>,
  ) {
    super(ipTypeRepository);
  }
}
