import { CreateTransactionService, TransactionCreateRequestDto } from 'src/functions/create-transaction.service';
import { ApiResponse } from 'src/models/api-response.model';
export declare class CreateTransactionController {
    private readonly service;
    constructor(service: CreateTransactionService);
    create(user_id: number, data: TransactionCreateRequestDto): Promise<ApiResponse>;
}
