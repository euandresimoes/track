import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  CreateTransactionService,
  TransactionCreateRequestDto,
} from 'src/functions/create-transaction.service';
import { ApiResponse } from 'src/models/api-response.model';
import { User } from 'src/utils/decorators/user.decorator';
import { JwtGuard } from 'src/utils/jwt/jwt.guard';

@Controller('v1/transaction/create')
export class CreateTransactionController {
  constructor(private readonly service: CreateTransactionService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  async create(
    @User('id') user_id: number,
    @Body() data: TransactionCreateRequestDto,
  ): Promise<ApiResponse> {
    return this.service.execute(user_id, data);
  }
}
