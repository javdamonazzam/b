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
import { UserServiceService } from './user_service.service';
import { CreateUserServiceDto } from './dto/create-user_service.dto';
import { UpdateUserServiceDto } from './dto/update-user_service.dto';
import { QueryParams } from 'src/base';

@Controller('userservice')
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}
  @Post('new')
  create(@Body() createUserServiceDto: CreateUserServiceDto) {
    return this.userServiceService.create(createUserServiceDto);
  }

  @Get('find')
  findAll(@Query() query: QueryParams) {
    return this.userServiceService.findAll(query);
  }
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userServiceService.findOneById(+id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserServiceDto: UpdateUserServiceDto,
  ) {
    return this.userServiceService.update(+id, updateUserServiceDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userServiceService.softDelete(+id);
  }
}
