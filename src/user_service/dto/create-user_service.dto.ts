import { IsNotEmpty } from 'class-validator';

export class CreateUserServiceDto {
  @IsNotEmpty()
  service_id: number;
  @IsNotEmpty()
  user_id: number;
  // @IsNotEmpty()
  // expire_time: Date;
}
