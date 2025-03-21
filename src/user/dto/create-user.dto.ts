import { RoleEnum } from '@/types/enum/role.enum';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  account_price: number;
  @IsNotEmpty()
  role?: RoleEnum[] ;
}
