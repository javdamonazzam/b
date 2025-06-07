import { ServiceService } from '@/service/service.service';
import { UserService } from '@/user/user.service';
import { WalletService } from '@/wallet/wallet.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TelUserService {
  constructor(
    private walletService: WalletService,
    private userService: UserService,
    private readonly serviceService: ServiceService,
  ) { }
  async start(body: any) {
    
    const user = await this.userService.findByUsername(String(body.chatId))
    if (!user) {
      await this.userService.create_user({ username: `${body.chatId}`, password: "lkjalkjgkjla", account_price: 45000 })
    }
    const wallet = await this.walletService.findOneBy({user_id: user.id})
    
    return {
      user_id:user.id,
      wallet_balance: wallet.wallet_balance,
      account_price: user.account_price,
    };
  }

 async create(body:any) {
   return await this.serviceService.create_account(body) 
  }

   async balance(body:any) {
   return await this.walletService.findByUsername(body.chatId)
  }
}
