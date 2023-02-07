import { PartialType } from '@nestjs/mapped-types';
import { CreatePractitionerDto } from './create-practitioner.dto';
import { IsString } from 'class-validator';

export class UpdatePractitionerDto extends PartialType(CreatePractitionerDto) {
  @IsString()
  public readonly id: string;
}
