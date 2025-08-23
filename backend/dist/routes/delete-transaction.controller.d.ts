import { DeleteTransactionService } from 'src/functions/delete-transaction.service';
import { ApiResponse } from 'src/models/api-response.model';
export declare class DeleteTransactionController {
    private readonly service;
    constructor(service: DeleteTransactionService);
    delete(user_id: number | string, transaction_id: number): Promise<ApiResponse>;
}
