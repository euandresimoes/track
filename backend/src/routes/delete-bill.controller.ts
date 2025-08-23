import { Controller, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiResponse } from 'src/models/api-response.model';
import { DeleteBillService } from 'src/services/delete-bill.service';
import { User } from 'src/utils/decorators/user.decorator';
import { JwtGuard } from 'src/utils/jwt/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('v1/bill/delete')
@ApiTags('Bill')
export class DeleteBillController {
  constructor(private readonly service: DeleteBillService) {}

  @Delete()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access_token')
  async delete(
    @User('id') userId: number | string,
    @Query('bill_id') billId: number | string,
  ): Promise<ApiResponse> {
    return this.service.execute(userId, billId);
  }
}
