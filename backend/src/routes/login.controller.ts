import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from 'src/models/api-response.model';
import { LoginService, LoginRequestDto } from 'src/services/login.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('v1/auth/login')
@ApiTags('Auth')
export class LoginController {
  constructor(private readonly service: LoginService) {}

  @Post()
  async login(@Body() dto: LoginRequestDto): Promise<ApiResponse> {
    return this.service.execute(dto);
  }
}
