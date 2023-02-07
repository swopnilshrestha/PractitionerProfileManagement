import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { PractitionerService } from './practitioner.service';
import { CreatePractitionerDto } from './dto/create-practitioner.dto';
import { UpdatePractitionerDto } from './dto/update-practitioner.dto';
import { JwtAuthGuard } from '../user/auth/auth.guard';
import { Practitioner } from './entities/practitioner.entity';

@Controller('practitioner')
export class PractitionerController {
  constructor(private readonly practitionerService: PractitionerService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  create(@Body() createPractitionerDto: CreatePractitionerDto) {
    return this.practitionerService.create(createPractitionerDto);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  findAll(@Headers() headers) {
    console.log(headers);

    return this.practitionerService.findAll();
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.practitionerService.findOne(+id);
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updatePractitionerDto: Practitioner) {
    return this.practitionerService.update(+id, updatePractitionerDto);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.practitionerService.delete(+id);
  }
}
