import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class FindAllTransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(Redis) private readonly redis: Redis,
  ) {}

  async execute(user_id: number | string) {
    const cachedTransactions = await this.redis.get(
      `user:${user_id}:transactions`,
    );
    if (cachedTransactions) {
      return JSON.parse(cachedTransactions);
    }

    const transactions = await this.prisma.transaction.findMany({
      where: {
        user_id: Number(user_id),
      },
    });

    await this.redis.set(
      `user:${user_id}:transactions`,
      JSON.stringify(transactions),
      'EX',
      3600,
    );
    
    return transactions;
  }
}
