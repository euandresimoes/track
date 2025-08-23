import { Controller, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { ApiResponse } from 'src/models/api-response.model';
import { DeleteTransactionService } from 'src/services/delete-transaction.service';
import { User } from 'src/utils/decorators/user.decorator';
import { JwtGuard } from 'src/utils/jwt/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('v1/transaction/delete')
@ApiTags('Transaction')
export class DeleteTransactionController {
  constructor(private readonly service: DeleteTransactionService) {}

  @Delete()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  async delete(
    @User('id') userId: number | string,
    @Query('transaction_id') transactionId: number | string,
  ): Promise<ApiResponse> {
    return this.service.execute(userId, transactionId);
  }
}
