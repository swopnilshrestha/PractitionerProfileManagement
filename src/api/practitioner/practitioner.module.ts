import { Module } from '@nestjs/common';
import { PractitionerService } from './practitioner.service';
import { PractitionerController } from './practitioner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Practitioner } from './entities/practitioner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Practitioner])],
  controllers: [PractitionerController],
  providers: [PractitionerService],
})
export class PractitionerModule {}
