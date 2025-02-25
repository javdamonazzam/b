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
import { DiscountCodeService } from './discount_code.service';
import { CreateDiscountCodeDto } from './dto/create-discount_code.dto';
import { UpdateDiscountCodeDto } from './dto/update-discount_code.dto';
import { QueryParams } from 'src/base';

@Controller('discountcode')
export class DiscountCodeController {
  constructor(private readonly discountCodeService: DiscountCodeService) {}

  @Post('new')
  create(@Body() createDiscountCodeDto: CreateDiscountCodeDto) {
    return this.discountCodeService.create(createDiscountCodeDto);
  }

  @Get('find')
  findAll(@Query() query: QueryParams) {
    return this.discountCodeService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discountCodeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDiscountCodeDto: UpdateDiscountCodeDto,
  ) {
    return this.discountCodeService.update(+id, updateDiscountCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discountCodeService.softDelete(+id);
  }
}
