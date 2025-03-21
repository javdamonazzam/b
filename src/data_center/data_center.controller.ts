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
import { DataCenterService } from './data_center.service';
import { CreateDataCenterDto } from './dto/create-data_center.dto';
import { UpdateDataCenterDto } from './dto/update-data_center.dto';
import { QueryParams } from 'src/base';

@Controller('datacenter')
export class DataCenterController {
  constructor(private readonly dataCenterService: DataCenterService) {}

  @Post('new')
  create(@Body() createDataCenterDto: CreateDataCenterDto) {
    return this.dataCenterService.create(createDataCenterDto);
  }

  @Get('find')
  findAll(@Query() query: QueryParams) {
    return this.dataCenterService.findAll(query);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dataCenterService.findOne(+id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    
    @Body() dataCenterService: UpdateDataCenterDto,
    ) {
    return this.dataCenterService.update(+id, dataCenterService);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataCenterService.softDelete(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDataCenterDto: UpdateDataCenterDto) {
  //   return this.dataCenterService.update(+id, updateDataCenterDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.dataCenterService.remove(+id);
  // }
}
