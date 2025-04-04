import { Injectable } from '@nestjs/common';
import { CreateTelegramDto } from './dto/create-telegram.dto';
import { UpdateTelegramDto } from './dto/update-telegram.dto';
import { WalletService } from '@/wallet/wallet.service';
import { UserService } from '@/user/user.service';
import { ServiceService } from '@/service/service.service';

@Injectable()
export class TelegramService {
  constructor(
    private walletService: WalletService,
    private userService: UserService,
    private readonly serviceService: ServiceService,
  ) { }
  async start(body: any) {
    console.log("start");
    
    const user = await this.userService.findByUsername(String(body.chatId))
    console.log(user);
    
    if (!user) {
      await this.userService.create_user({ username: `${body.chatId}`, password: "lkjalkjgkjla", account_price: 45000 })
    }
    const wallet = await this.walletService.findOneBy({user_id: user.id})
    console.log(wallet.wallet_balance);
    
    return {
      user_id:user.id,
      wallet_balance: wallet.wallet_balance,
      account_price: user.account_price,
    };
  }

 async create(body:any) {
    console.log("start",body);
   return await this.serviceService.create_account(body) 
  }
}
