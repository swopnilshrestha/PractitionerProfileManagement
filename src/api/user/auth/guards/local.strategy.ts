import { UserDto } from '../auth.dto';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    username: string,
    password: string,
  ): Promise<Omit<UserDto, 'password'>> {
    const user = this.authService.retrieveUser(username, password);
    console.log('3', user);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
