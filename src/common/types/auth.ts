import { User } from '@/api/user/user.entity';
import { Request } from 'express';

export interface ISignInResponse {
  token: string;
}

export interface IGetUserAuthInfoRequest extends Request {
  user: User;
}
