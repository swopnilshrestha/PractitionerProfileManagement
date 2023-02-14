import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { UpdateNameDto } from './user.dto';
import { User } from './user.entity';

interface IGetUserAuthInfoRequest extends Request {
  user: User;
}

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async updateName(
    body: UpdateNameDto,
    req: IGetUserAuthInfoRequest,
  ): Promise<User> {
    const user: User = <User>req.user;
    user.name = body.name;
    return this.repository.save(user);
  }

  public async findByEmail(email: string): Promise<User> {
    const result = await this.repository.find({ where: { email } });
    return result[0];
  }
}
