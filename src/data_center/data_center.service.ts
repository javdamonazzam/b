import { Injectable } from '@nestjs/common';
import { CreateDataCenterDto } from './dto/create-data_center.dto';
import { UpdateDataCenterDto } from './dto/update-data_center.dto';
import { BaseCrudService } from 'src/base';
import { DataCenter } from './entities/data_center.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DataCenterService extends BaseCrudService<DataCenter> {
  constructor(
    @InjectRepository(DataCenter)
    protected data_centerRepository: Repository<DataCenter>,
  ) {
    super(data_centerRepository);
  }
}
