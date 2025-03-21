import { IsNotEmpty } from 'class-validator';

export class CreateDiscountCodeDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  service_id: number;
  @IsNotEmpty()
  percent: number;
}
