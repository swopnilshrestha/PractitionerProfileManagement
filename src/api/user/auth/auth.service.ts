import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthHelper } from './auth.helper';
import { ISignInResponse } from '@/common/types/auth';
import { UserService } from '../user.service';
import { User } from '../user.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async register(body: RegisterDto): Promise<User | never> {
    const { name, email, password }: RegisterDto = body;
    let user: User = await this.repository.findOne({ where: { email } });
    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    user = new User();
    user.name = name;
    user.email = email;
    user.password = this.helper.encodePassword(password);

    return this.repository.save(user);
  }

  public async login(body: LoginDto): Promise<ISignInResponse | never> {
    const { email, password }: LoginDto = body;
    const user: any = await this.repository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    const isPasswordValid: boolean = this.helper.isPasswordValid(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    this.repository.update(user.id, { lastLoginAt: new Date() });
    return { token: this.helper.generateToken(user) };
  }

  public async refresh(user: User): Promise<string> {
    this.repository.update(user.id, { lastLoginAt: new Date() });
    return this.helper.generateToken(user);
  }

  public async retrieveUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && user.password) {
      //remove password and return user
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
