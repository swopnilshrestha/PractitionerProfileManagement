import { Trim } from 'class-sanitizer';
import { IsEmail, IsDate, IsString } from 'class-validator';

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

  // @IsDate()
  // public readonly nextApppointment: string;

  // @IsDate()
  // public readonly lastApppointment: string;

  // @IsDate()
  // public readonly registerDate: string;
}
