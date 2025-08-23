import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequestDto, LoginService } from 'src/functions/login.service';
import { ApiResponse } from 'src/models/api-response.model';

@Controller('v1/auth/login')
export class LoginController {
  constructor(private readonly service: LoginService) {}

  @Post()
  async login(@Body() dto: LoginRequestDto): Promise<ApiResponse> {
    return this.service.execute(dto);
  }
}
