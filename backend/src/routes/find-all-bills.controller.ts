import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiResponse } from 'src/models/api-response.model';
import { FindAllBillsService } from 'src/services/find-all-bills.service';
import { User } from 'src/utils/decorators/user.decorator';
import { JwtGuard } from 'src/utils/jwt/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('v1/bill/find')
@ApiTags('Bill')
export class FindAllBillsController {
  constructor(private readonly service: FindAllBillsService) {}

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  async findAll(@User('id') userId: number | string): Promise<ApiResponse> {
    return this.service.execute(userId);
  }
}
