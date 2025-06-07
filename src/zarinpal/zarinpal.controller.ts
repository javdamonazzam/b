import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ZarinpalService } from './zarinpal.service';
import { CreateZarinpalDto } from './dto/create-zarinpal.dto';
import { UpdateZarinpalDto } from './dto/update-zarinpal.dto';

@Controller('zarinpal')
export class ZarinpalController {
  constructor(private readonly zarinpalService: ZarinpalService) {}

  @Post("auth")
  initiatePayment(@Body() createZarinpalDto: CreateZarinpalDto) {
    return this.zarinpalService.initiatePayment(createZarinpalDto);
  }
  @Post("verify")
  verifyPayment(@Body() body:any) {
    console.log(body);
    
    return this.zarinpalService.verifyPayment(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    
    return this.zarinpalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZarinpalDto: UpdateZarinpalDto) {
    return this.zarinpalService.update(+id, updateZarinpalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zarinpalService.remove(+id);
  }
}
