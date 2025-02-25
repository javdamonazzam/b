import { IsNotEmpty } from 'class-validator';

export class CreateTelUserDto {
  @IsNotEmpty()
  chatId: string;
  @IsNotEmpty()
  server_info?: string;
}
