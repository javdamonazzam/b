import { PartialType } from '@nestjs/mapped-types';
import { CreateDataCenterDto } from './create-data_center.dto';

export class UpdateDataCenterDto extends PartialType(CreateDataCenterDto) {}
