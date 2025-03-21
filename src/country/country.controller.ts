import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { QueryParams } from 'src/base';
import { Query } from '@nestjs/common';
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post('new')
  create(@Body() createCountryDto: CreateCountryDto) {
    return this.countryService.create(createCountryDto);
  }
  
  @Get('find')
  findAll(@Query() query: QueryParams) {
    return this.countryService.findAll(query);
  }
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.countryService.findOneById(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countryService.update(+id, updateCountryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countryService.softDelete(+id);
  }
}
