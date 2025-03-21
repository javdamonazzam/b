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
import { ServiceInfoService } from './service_info.service';
import { CreateServiceInfoDto } from './dto/create-service_info.dto';
import { UpdateServiceInfoDto } from './dto/update-service_info.dto';
import { QueryParams } from 'src/base';

// @Controller('service-info')
// export class ServiceInfoController {
//   constructor(private readonly serviceInfoService: ServiceInfoService) {}

//   @Post()
//   create(@Body() createServiceInfoDto: CreateServiceInfoDto) {
//     return this.serviceInfoService.create(createServiceInfoDto);
//   }

//   @Get()
//   findAll() {
//     return this.serviceInfoService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.serviceInfoService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateServiceInfoDto: UpdateServiceInfoDto) {
//     return this.serviceInfoService.update(+id, updateServiceInfoDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.serviceInfoService.remove(+id);
//   }
// }

@Controller('serviceinfo')
export class ServiceInfoController {
  constructor(private readonly serviceInfoService: ServiceInfoService) {}

  @Post('new')
  create(@Body() CreateServiceInfoDto: CreateServiceInfoDto) {
    return this.serviceInfoService.create(CreateServiceInfoDto);
  }

  @Get('find')
  findAll(@Query() query: QueryParams) {
    return this.serviceInfoService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceInfoService.findOne(+id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServerInfoDto: UpdateServiceInfoDto,
  ) {
    return this.serviceInfoService.update(+id, updateServerInfoDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceInfoService.softDelete(+id);
  }
}
