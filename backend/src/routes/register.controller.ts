import { Body, Controller, Post } from '@nestjs/common';
import { RegisterRequestDto } from 'src/functions/register.service';
import { RegisterService } from 'src/functions/register.service';
import { ApiResponse } from 'src/models/api-response.model';

@Controller('v1/auth/register')
export class RegisterController {
  constructor(private readonly service: RegisterService) {}

  @Post()
  async register(@Body() dto: RegisterRequestDto): Promise<ApiResponse> {
    return this.service.execute(dto);
  }
}
