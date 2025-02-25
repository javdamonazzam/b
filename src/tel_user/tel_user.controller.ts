import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TelUserService } from './tel_user.service';
import { CreateTelUserDto } from './dto/create-tel_user.dto';
import { UpdateTelUserDto } from './dto/update-tel_user.dto';
import { Public } from '@/auth/decorators/public.decorator';

@Controller('tel')
export class TelUserController {
  constructor(private readonly telUserService: TelUserService) {}
  @Public()
  @Post()
  created(@Body() createTelUserDto: CreateTelUserDto) {
    return this.telUserService.createuser(createTelUserDto);
  }

  @Get()
  findAll() {
    return this.telUserService.findAll({});
  }
}
