import { Module } from '@nestjs/common';
import { CreateTransactionService } from '../create-transaction.service';
import { CreateTransactionController } from 'src/routes/create-transaction.controller';
import { DeleteTransactionService } from '../delete-transaction.service';
import { DeleteTransactionController } from 'src/routes/delete-transaction.controller';
import { FindAllTransactionsService } from '../find-all-transactions.service';
import { FindAllTransactionsController } from 'src/routes/find-all-transactions.controller';

@Module({
  providers: [
    CreateTransactionService,
    DeleteTransactionService,
    FindAllTransactionsService,
  ],
  controllers: [
    CreateTransactionController,
    DeleteTransactionController,
    FindAllTransactionsController,
  ],
})
export class TransactionModule {}
