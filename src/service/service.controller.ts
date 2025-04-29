import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { QueryParams } from 'src/base';
import { Public } from '@/auth/decorators/public.decorator';
import { Response } from 'express';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) { }

  @Post('new')
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create_account(createServiceDto);
  }

  @Get('find')
  findAll(@Query() query: QueryParams) {
    return this.serviceService.findAll(query);
  }
  @Public()
  @Get('public')
  async publicfind(@Query() query: QueryParams, @Res() res: Response) {
    const results = await this.serviceService.downloadPublic(query);
    const buffer = results?.result[0]?.server_info;
    res.set({
      'Content-Disposition': `attachment; filename="${results?.result[0].title}.ovpn"`,
      'Content-Type': 'application/octet-stream',
    });
    res.send(buffer);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(+id);
  }
  @Patch(':id')
  updateDate(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.updateDate(+id);
  }
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    console.log(id, Body);
    return this.serviceService.update(+id, updateServiceDto);
  }
  @Delete('expires')
  remove_expire() {
    return this.serviceService.Delete_expir_Service();
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.DeleteService(+id);
  }
}
