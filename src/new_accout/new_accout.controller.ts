import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewAccoutService } from './new_accout.service';
import { CreateNewAccoutDto } from './dto/create-new_accout.dto';
import { UpdateNewAccoutDto } from './dto/update-new_accout.dto';

@Controller('new-accout')
export class NewAccoutController {
  constructor(private readonly newAccoutService: NewAccoutService) {}

  @Post('new')
  create(@Body() createNewAccoutDto: CreateNewAccoutDto) {
    return this.newAccoutService.create(createNewAccoutDto);
  }

  // @Get()
  // findAll() {
  //   return this.newAccoutService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.newAccoutService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNewAccoutDto: UpdateNewAccoutDto) {
  //   return this.newAccoutService.update(+id, updateNewAccoutDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.newAccoutService.remove(+id);
  // }
}
