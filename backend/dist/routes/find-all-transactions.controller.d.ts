import { FindAllTransactionsService } from 'src/functions/find-all-transactions.service';
import { ApiResponse } from 'src/models/api-response.model';
export declare class FindAllTransactionsController {
    private readonly servicie;
    constructor(servicie: FindAllTransactionsService);
    findAll(user_id: number | string): Promise<ApiResponse>;
}
