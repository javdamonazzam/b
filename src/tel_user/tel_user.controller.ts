import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { TelUserService } from './tel_user.service';
import { CreateTelUserDto } from './dto/create-tel_user.dto';
import { Public } from '@/auth/decorators/public.decorator';

@Controller('tel')
export class TelUserController {
  constructor(private readonly telUserService: TelUserService) {}

  @Public()
  @Post('start')
  start(@Body() body: any) {
    return this.telUserService.start(body);
  }

  @Public()
  @Post('config')
  create(@Body() body: any) {
    
    return this.telUserService.create(body);
  }
  @Public()
  @Post('balance')
  balance(@Body() body: any) {
    return this.telUserService.balance(body);
  }
}
