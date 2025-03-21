import { PartialType } from '@nestjs/mapped-types';
import { CreateNewAccoutDto } from './create-new_accout.dto';

export class UpdateNewAccoutDto extends PartialType(CreateNewAccoutDto) {}
