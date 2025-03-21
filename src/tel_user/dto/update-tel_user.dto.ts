import { PartialType } from '@nestjs/mapped-types';
import { CreateTelUserDto } from './create-tel_user.dto';

export class UpdateTelUserDto extends PartialType(CreateTelUserDto) {}
