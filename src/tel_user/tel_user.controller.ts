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
  @Post()
  async create(@Body() createTelUserDto: CreateTelUserDto) {
    // return await this.telUserService.createUser(createTelUserDto);
  }

}
