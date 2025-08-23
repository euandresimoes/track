import Redis from 'ioredis';
import { PrismaService } from 'src/db/prisma.service';
import { ApiResponse } from 'src/models/api-response.model';
export declare class FindAllTransactionsService {
    private readonly prisma;
    private readonly redis;
    constructor(prisma: PrismaService, redis: Redis);
    execute(user_id: number | string): Promise<ApiResponse>;
}
