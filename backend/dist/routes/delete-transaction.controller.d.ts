import { ApiResponse } from 'src/models/api-response.model';
import { DeleteTransactionService } from 'src/services/delete-transaction.service';
export declare class DeleteTransactionController {
    private readonly service;
    constructor(service: DeleteTransactionService);
    delete(userId: number | string, transactionId: number | string): Promise<ApiResponse>;
}
