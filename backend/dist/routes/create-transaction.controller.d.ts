import { ApiResponse } from 'src/models/api-response.model';
import { CreateTransactionService, TransactionCreateRequestDto } from 'src/services/create-transaction.service';
export declare class CreateTransactionController {
    private readonly service;
    constructor(service: CreateTransactionService);
    create(userId: number, data: TransactionCreateRequestDto): Promise<ApiResponse>;
}
