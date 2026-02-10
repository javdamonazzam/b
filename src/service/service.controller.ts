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

  @Get('find')
  findAll(@Query() query: QueryParams) {
    return this.serviceService.findAll(query);
  }
  @Post('start')
  async startPayment(@Body() body: any) {
    console.log("start", body);
  }
  @Public()
  @Get('public')
  async publicfind(@Query() query: QueryParams, @Res() res: Response) {

    const results = await this.serviceService.downloadPublic(query);
    console.log(results?.result[0]?.server_id);

    const buffer = results?.result[0]?.server_info;
    if ([2, 17, 18].includes(results?.result[0]?.server_id)) {
      const reskami = await axios.get(
        `http://79.133.46.247:5000/create?publicKey=${query.title}`,
      );

      const config = reskami.data.replace('79.133.46.247', 'info.jettingwire.xyz');
      res.set({
        'Content-Disposition': `attachment; filename="${query.title}.ovpn"`,
        'Content-Type': 'application/octet-stream',
      });
      res.send(config);
      return
    }
    res.set({
      'Content-Disposition': `attachment; filename="${results?.result[0].title}.ovpn"`,
      'Content-Type': 'application/octet-stream',
    });
    res.send(buffer);
  }

  // غیر فعال سازی
  @Public()
  @Get('deactive/:id')
  async deactive(@Param('id') id: number){
    return this.serviceService.deactive(id)
  }
// فعال سازی 
  @Public()
  @Get('active/:id')
  async active(@Param('id') id: number){
    return this.serviceService.active(id)
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
