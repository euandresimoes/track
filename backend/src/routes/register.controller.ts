import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from 'src/models/api-response.model';
import {
  RegisterService,
  RegisterRequestDto,
} from 'src/services/register.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('v1/auth/register')
@ApiTags('Auth')
export class RegisterController {
  constructor(private readonly service: RegisterService) {}

  @Post()
  async register(@Body() dto: RegisterRequestDto): Promise<ApiResponse> {
    return this.service.execute(dto);
  }
}
