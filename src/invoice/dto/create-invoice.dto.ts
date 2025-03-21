import { IsNotEmpty } from 'class-validator';

export class CreateInvoiceDto {
  @IsNotEmpty()
  user_id: number;
  @IsNotEmpty()
  status: FactorStatusEnum;
  @IsNotEmpty()
  price: number;

}
