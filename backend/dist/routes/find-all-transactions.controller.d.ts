import { ApiResponse } from 'src/models/api-response.model';
import { FindAllTransactionsService } from 'src/services/find-all-transactions.service';
export declare class FindAllTransactionsController {
    private readonly servicie;
    constructor(servicie: FindAllTransactionsService);
    findAll(userId: number | string): Promise<ApiResponse>;
}
