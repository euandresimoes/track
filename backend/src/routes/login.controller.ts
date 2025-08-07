import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequestDto, LoginService } from 'src/functions/login.service';

@Controller('v1/auth/login')
export class LoginController {
  constructor(private readonly service: LoginService) {}

  @Post()
  async login(@Body() dto: LoginRequestDto) {
    return this.service.execute(dto);
  }
}
