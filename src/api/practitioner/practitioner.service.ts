import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePractitionerDto } from './dto/create-practitioner.dto';
import { UpdatePractitionerDto } from './dto/update-practitioner.dto';
import { Practitioner } from './entities/practitioner.entity';

@Injectable()
export class PractitionerService {
  @InjectRepository(Practitioner)
  private readonly repository: Repository<Practitioner>;

  public async create(body: CreatePractitionerDto) {
    const { email, name, city, phoneNumber }: CreatePractitionerDto = body;
    let practitioner: Practitioner = await this.repository.findOne({
      where: { email },
    });
    if (practitioner) {
      throw new HttpException('Email already exists.', HttpStatus.CONFLICT);
    }
    practitioner = new Practitioner();
    practitioner.name = name;
    practitioner.city = city;
    practitioner.email = email;
    practitioner.phoneNumber = phoneNumber;
    practitioner.registerDate = new Date();
    return this.repository.save(practitioner);
  }

  public async findAll() {
    const practitioner: Practitioner[] = await this.repository.find();
    return practitioner;
  }

  public async findOne(id: number) {
    const practitioner: Practitioner = await this.repository.findOne({
      where: { id },
    });
    return practitioner;
  }

  // TODO: Need to work on this
  public async update(id: number, updatePractitionerDto: Practitioner) {
    return await this.repository.update(id, updatePractitionerDto);
  }

  public async delete(id: number) {
    return this.repository.delete({ id });
  }
}
