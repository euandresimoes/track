import {
  Body,
  Controller,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from 'src/models/api-response.model';
import {
  UpdateBillRequestDto,
  UpdateBillService,
} from 'src/services/update-bill.service';
import { User } from 'src/utils/decorators/user.decorator';
import { JwtGuard } from 'src/utils/jwt/jwt.guard';

@Controller('v1/bill/update')
@ApiTags('Bill')
export class UpdateBillController {
  constructor(private readonly service: UpdateBillService) {}

  @Patch()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access_token')
  async updateBill(
    @User('id') userId: string | number,
    @Query('bill_id') billId: number,
    @Body() data: UpdateBillRequestDto,
  ): Promise<ApiResponse> {
    return this.service.execute(userId, billId, data);
  }
}
