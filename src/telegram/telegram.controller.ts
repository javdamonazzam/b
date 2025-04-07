import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { CreateTelegramDto } from './dto/create-telegram.dto';
import { UpdateTelegramDto } from './dto/update-telegram.dto';
import { Public } from '@/auth/decorators/public.decorator';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) { }

  @Public()
  @Post('start')
  start(@Body() body: any) {
    return this.telegramService.start(body);
  }

  @Public()
  @Post('config')
  create(@Body() body: any) {
    
    return this.telegramService.create(body);
  }

  @Public()
  @Post('balance')
  balance(@Body() body: any) {
    return this.telegramService.balance(body);
  }
}
