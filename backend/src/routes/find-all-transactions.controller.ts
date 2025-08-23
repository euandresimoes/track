import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { FindAllTransactionsService } from 'src/functions/find-all-transactions.service';
import { ApiResponse } from 'src/models/api-response.model';
import { User } from 'src/utils/decorators/user.decorator';
import { JwtGuard } from 'src/utils/jwt/jwt.guard';

@Controller('v1/transaction/find')
export class FindAllTransactionsController {
  constructor(private readonly servicie: FindAllTransactionsService) {}

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  async findAll(@User('id') user_id: number | string): Promise<ApiResponse> {
    return this.servicie.execute(user_id);
  }
}
