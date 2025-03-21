import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryParams } from 'src/base';
import { Roles } from 'src/auth/decorators/role.decorator';
import { RoleEnum } from 'src/types/enum/role.enum';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
 
  @Post('create')
  @Roles(RoleEnum.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    
    return this.userService.create_user(createUserDto);
  }
  @Get('fi')
  find(@Body() createUserDto: CreateUserDto) {
    return this.userService.find(createUserDto);
  }
  
  @Get('find')
  findAll(@Query() query: QueryParams) {
    return this.userService.findAll(query);
  }
}
