import { CreateTransactionService, TransactionCreateRequestDto } from 'src/functions/create-transaction.service';
export declare class CreateTransactionController {
    private readonly service;
    constructor(service: CreateTransactionService);
    create(user_id: number, data: TransactionCreateRequestDto): Promise<void>;
}
