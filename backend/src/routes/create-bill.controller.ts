import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiResponse } from 'src/models/api-response.model';
import {
  CreateBillRequestDto,
  CreateBillService,
} from 'src/services/create-bill.service';
import { User } from 'src/utils/decorators/user.decorator';
import { JwtGuard } from 'src/utils/jwt/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('v1/bill/create')
@ApiTags('Bill')
export class CreateBillController {
  constructor(private readonly service: CreateBillService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  async create(
    @User('id') userId: string | number,
    @Body() dto: CreateBillRequestDto,
  ): Promise<ApiResponse> {
    return this.service.execute(userId, dto);
  }
}
