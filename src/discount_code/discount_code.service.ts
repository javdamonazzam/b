import { Injectable } from '@nestjs/common';
import { CreateDiscountCodeDto } from './dto/create-discount_code.dto';
import { UpdateDiscountCodeDto } from './dto/update-discount_code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCrudService } from 'src/base';
import { DiscountCode } from './entities/discount_code.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiscountCodeService extends BaseCrudService<DiscountCode> {
  constructor(
    @InjectRepository(DiscountCode)
    protected discountCodeRepository: Repository<DiscountCode>,
  ) {
    super(discountCodeRepository);
  }
}
