import { IsNotEmpty } from 'class-validator';
export class CreateCountryDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  code: string;
  @IsNotEmpty()
  status: boolean;
}
