import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { BaseCrudService } from 'src/base';
import { Invoice } from './entities/invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletService } from '@/wallet/wallet.service';

@Injectable()
export class InvoiceService extends BaseCrudService<Invoice> {
  constructor(
    @InjectRepository(Invoice)
    protected invoiceRepository: Repository<Invoice>,
    private  walletService: WalletService,
  ) {
    super(invoiceRepository);
  }
  async createFactor(body: CreateInvoiceDto) {
    if(!body.user_id)  throw new UnauthorizedException('اطلاعات وارد شده کافی نیست')
    await this.walletService.charge(body.user_id,body.price)
    return await super.create(body);;
  }
}
 