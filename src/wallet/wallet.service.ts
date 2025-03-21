import { Injectable, NotFoundException } from '@nestjs/common';
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
  async charge(id: number, charge: number) {
    const wallet = await this.walletRepository.findOneBy({ user_id: id });
  
    // بررسی null بودن
    if (!wallet) {
      throw new NotFoundException(`Wallet for user ID ${id} not found`);
    }
  
    // محاسبه موجودی جدید
    const newBalance = wallet.wallet_balance + charge;
  
    const newBody = {
      wallet_balance: newBalance,
    };
  
    // به‌روزرسانی موجودی
    return super.update(wallet.id, newBody);
  }
  
}
