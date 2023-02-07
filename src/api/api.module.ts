import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PractitionerModule } from './practitioner/practitioner.module';

@Module({
  imports: [UserModule, PractitionerModule]
})
export class ApiModule {}
