import { Trim } from 'class-sanitizer';
import { IsEmail, IsString } from 'class-validator';

export class CreatePractitionerDto {
  @Trim()
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly name: string;

  @IsString()
  public readonly phoneNumber: string;

  @IsString()
  public readonly city: string;
}
