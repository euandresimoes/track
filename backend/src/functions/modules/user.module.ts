import { Module } from '@nestjs/common';
import { RegisterService } from '../register.service';
import { RegisterController } from 'src/routes/register.controller';
import { LoginService } from '../login.service';
import { LoginController } from 'src/routes/login.controller';

@Module({
  providers: [RegisterService, LoginService],
  controllers: [RegisterController, LoginController],
})
export class UserModule {}
