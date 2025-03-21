import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceInfoDto } from './create-service_info.dto';

export class UpdateServiceInfoDto extends PartialType(CreateServiceInfoDto) {}
