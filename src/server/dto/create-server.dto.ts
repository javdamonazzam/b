import { ServiceType } from '@/types/enum/service_type';
import { IsNotEmpty } from 'class-validator';
export class CreateServerDto {
  @IsNotEmpty()
  ip?: string;
  @IsNotEmpty()
  @IsNotEmpty()
  service_type: ServiceType;
  port?: number;
  @IsNotEmpty()
  damein: string;
  @IsNotEmpty()
  max_user: number;
}
