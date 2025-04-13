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
    const user = await this.userService.findByUsername(String(body.chatId))

    if (!user) {
      return await this.userService.create_user({ username: `${body.chatId}`, password: "lkjalkjgkjla", account_price: 45000 })
    }
  }

  async create(body: any) {
    return await this.serviceService.create_account(body)
  }
  async balance(body: any) {
    
    const user = await this.userService.findOneBy({username:body.chatId})
   const wallet=await this.walletService.findOneBy({user_id:user.id})
   return {wallet,user}
  }
}
