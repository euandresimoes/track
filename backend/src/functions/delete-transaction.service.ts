import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class DeleteTransactionService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(Redis) private readonly redis: Redis,
  ) {}

  async execute(user_id: number | string, transaction_id: number) {
    const transaction = await this.prisma.transaction.findFirst({
      where: {
        id: Number(transaction_id),
        user_id: Number(user_id),
      },
    });

    if (!transaction) {
      throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
    }

    await this.prisma.transaction.delete({
      where: {
        id: Number(transaction_id),
        user_id: Number(user_id),
      },
    });

    await this.redis.del(`user:${user_id}:transactions`);
  }
}
