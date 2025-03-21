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
import { ServerService } from './server.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { QueryParams } from 'src/base';
import { startWith } from 'rxjs';
import { Roles } from '@/auth/decorators/role.decorator';
import { RoleEnum } from '@/types/enum/role.enum';
import { Public } from '@/auth/decorators/public.decorator';

@Controller('server')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}


  @Roles(RoleEnum.ADMIN)
  @Post('new')
  create(@Body() createServerDto: CreateServerDto) {
    
    return this.serverService.create(createServerDto);
  }
  
  @Get('find')
  findAll(@Query() query: QueryParams) {
    return this.serverService.findAll(query);
  }
  @Get('user/:id')
  findByuser(@Param('id') id: number) {
    return this.serverService.findByuser(+id);
  }
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.serverService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServerDto: UpdateServerDto) {
    return this.serverService.update(+id, updateServerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serverService.softDelete(+id);
  }
}
