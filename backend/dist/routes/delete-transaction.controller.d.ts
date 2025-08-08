import { DeleteTransactionService } from 'src/functions/delete-transaction.service';
export declare class DeleteTransactionController {
    private readonly service;
    constructor(service: DeleteTransactionService);
    delete(user_id: number | string, transaction_id: number): Promise<void>;
}
