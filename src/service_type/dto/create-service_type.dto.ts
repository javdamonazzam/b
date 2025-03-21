import { IsEnum, IsNotEmpty } from 'class-validator';
import { IpType } from '../../types/enum/ip-type.enum';

export class CreateServiceTypeDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  slug: string;
  @IsEnum(IpType)
  ip_type: IpType;
  @IsNotEmpty()
  volum: number;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  time: number;
}