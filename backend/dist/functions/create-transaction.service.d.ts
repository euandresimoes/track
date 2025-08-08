import { PrismaService } from 'src/db/prisma.service';
import { TransactionType } from './enums/transaction-type.enum';
import Redis from 'ioredis';
export declare class TransactionCreateRequestDto {
    amount: number;
    description: string;
    type: TransactionType;
}
export declare class CreateTransactionService {
    private readonly prisma;
    private readonly redis;
    constructor(prisma: PrismaService, redis: Redis);
    execute(user_id: number | string, data: TransactionCreateRequestDto): Promise<void>;
}
