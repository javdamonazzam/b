import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { BaseCrudService } from 'src/base';
import { Country } from './entities/country.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService extends BaseCrudService<Country> {
  constructor(
    @InjectRepository(Country)
    protected countryRepository: Repository<Country>,
  ) {
    super(countryRepository);
  }
}
