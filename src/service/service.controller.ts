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
import axios from 'axios';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) { }

  @Post('new')
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create_account(createServiceDto);
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
  @Public()
  @Get('link')
  // behrang
  async linkfind(@Query() query: QueryParams, @Res() res: Response) {
    // const results = await this.serviceService.downloadPublic(query);
    // const buffer = results?.result[0]?.server_info;
    // res.send(buffer);
    if (query.title) {

    }
    await axios.get('http://79.133.46.247:3000/list')
      .then(async response => {

        const cleanedData = response.data
          .split('\n')  // جدا کردن هر خط
          .filter((line: string) => line.trim() !== '')  // حذف خطوط خالی
          .map((line: string) => line.replace(/^\s*\d+\)\s*/, ''));  // حذف شماره و پرانتز

        if (cleanedData.includes(query.title)) {

          const create = await axios.get(`http://79.133.46.247:3000/create?publicKey=${query.title}`);
          const buffer = create.data.replace('79.133.46.247', 'be.jettingwire.xyz');
          res.set({
            'Content-Disposition': `attachment; filename="${query.title}.ovpn"`,
            'Content-Type': 'application/octet-stream',
          });
          res.send(buffer);
        } else {

        }
      })
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {

    return this.serviceService.updateDate(+id);
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
