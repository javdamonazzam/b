import { IsNotEmpty } from 'class-validator';
export class CreateDataCenterDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  website: string;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
