import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { QueryParams } from 'src/base';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('new')
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto);
  }

  @Get('find')
  findAll(@Query() query: QueryParams) {
    return this.walletService.findAll(query);
  }

  @Get('user/:user_id')
  findBy(@Param('user_id') user_id: string) {
    return this.walletService.findOneBy({user_id:+user_id});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() price:number ) {
    return this.walletService.charge(+id, price );
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletService.softDelete(+id);
  }
}
