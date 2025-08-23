import { Module } from '@nestjs/common';
import { RegisterService } from '../register.service';
import { RegisterController } from 'src/routes/register.controller';
import { LoginService } from '../login.service';
import { LoginController } from 'src/routes/login.controller';
import { UserProfileService } from '../user-profile.service';
import { UserProfileController } from 'src/routes/user-profile.controller';

@Module({
  providers: [RegisterService, LoginService, UserProfileService],
  controllers: [RegisterController, LoginController, UserProfileController],
})
export class UserModule {}
