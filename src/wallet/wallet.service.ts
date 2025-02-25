import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { BaseCrudService } from 'src/base';
import { Wallet } from './entities/wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WalletService extends BaseCrudService<Wallet> {
  constructor(
    @InjectRepository(Wallet)
    protected walletRepository: Repository<Wallet>,
  ) {
    super(walletRepository);
  }
  async charge(id: number, charge:number) {
    const wallet = await this.walletRepository.findOneBy({user_id: id});
    if(charge>0){
    const newBalance = (+wallet.wallet_balance)+(+charge);
    const newBody = {
        wallet_balance: newBalance,
    };
    return super.update(wallet.id, newBody);
  }else{
   const balance =wallet.wallet_balance
    const newBalance=balance+(charge)
    const newBody = {
        wallet_balance: newBalance,
    };
    return super.update(wallet.id, newBody);
  }
}
  // async Reducecosts(id:number,body:UpdateWalletDto){
  //   const wallet = await this.walletRepository.findOneBy({user_id: id});
  //   if(body.wallet_balance>0){
  //     const newBalance = body.wallet_balance +wallet.wallet_balance
  //     const newBody = {
  //       wallet_balance: newBalance,
  //   };
  //   return super.update(wallet.id, newBody);
  //   }else{
      
  //   }
    
  // }
}
