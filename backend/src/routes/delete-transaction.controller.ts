import { Controller, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { DeleteTransactionService } from 'src/functions/delete-transaction.service';
import { User } from 'src/utils/decorators/user.decorator';
import { JwtGuard } from 'src/utils/jwt/jwt.guard';

@Controller('v1/transaction/delete')
export class DeleteTransactionController {
  constructor(private readonly service: DeleteTransactionService) {}

  @Delete()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  async delete(
    @User('id') user_id: number | string,
    @Query('id') transaction_id: number,
  ) {
    return this.service.execute(user_id, transaction_id);
  }
}
