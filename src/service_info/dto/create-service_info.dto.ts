import { IsNotEmpty } from 'class-validator';

export class CreateServiceInfoDto {
  @IsNotEmpty()
  volum: number;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  time: number;
}
