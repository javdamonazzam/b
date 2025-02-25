import { ServiceType } from '@/types/enum/service_type';
import { IsNotEmpty } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  title?: string;
  @IsNotEmpty()
  user_id?: number;
  @IsNotEmpty()
  service_type: ServiceType;
  @IsNotEmpty()
  month: number;
  @IsNotEmpty()
  server_info: string;
  @IsNotEmpty()
  status: boolean;
}