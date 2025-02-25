import { IsNotEmpty } from 'class-validator';

export class CreateWalletDto {
  @IsNotEmpty()
  wallet_balance: number;
  @IsNotEmpty()
  user_id: number;
}
