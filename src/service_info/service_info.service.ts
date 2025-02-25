import { Injectable } from '@nestjs/common';
import { CreateServiceInfoDto } from './dto/create-service_info.dto';
import { UpdateServiceInfoDto } from './dto/update-service_info.dto';
import { BaseCrudService } from 'src/base';
import { ServiceInfo } from './entities/service_info.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ServiceInfoService extends BaseCrudService<ServiceInfo> {
  constructor(
    @InjectRepository(ServiceInfo)
    protected serverInfoRepository: Repository<ServiceInfo>,
  ) {
    super(serverInfoRepository);
  }
}
