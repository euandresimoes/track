import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { PrismaService } from 'src/db/prisma.service';
import { ApiResponse } from 'src/models/api-response.model';

@Injectable()
export class FindAllTransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(Redis) private readonly redis: Redis,
  ) {}

  async execute(user_id: number | string): Promise<ApiResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: Number(user_id),
      },
      select: {
        id: true,
        display_name: true,
        email: true,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const cachedTransactions = await this.redis.get(
      `user:${user.id}:transactions`,
    );
    if (cachedTransactions) {
      return {
        status: HttpStatus.OK,
        message: 'Transactions found successfully',
        data: {
          user: {
            ...user,
          },
          transactions: JSON.parse(cachedTransactions),
        },
      };
    }

    const transactions = await this.prisma.transaction.findMany({
      where: {
        user_id: user.id,
      },
    });

    await this.redis.set(
      `user:${user.id}:transactions`,
      JSON.stringify(transactions),
      'EX',
      3600,
    );

    return {
      status: HttpStatus.OK,
      message: 'Transactions found successfully',
      data: {
        user: {
          ...user,
        },
        transactions: transactions,
      },
    };
  }
}
