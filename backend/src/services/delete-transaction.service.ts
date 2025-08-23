import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { PrismaService } from 'src/db/prisma.service';
import { ApiResponse } from 'src/models/api-response.model';

@Injectable()
export class DeleteTransactionService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(Redis) private readonly redis: Redis,
  ) {}

  async execute(
    userId: number | string,
    transaction_id: number | string,
  ): Promise<ApiResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: Number(userId),
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

    const transaction = await this.prisma.transaction.findFirst({
      where: {
        id: Number(transaction_id),
        user_id: user.id,
      },
      select: {
        id: true,
        amount: true,
        description: true,
        type: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!transaction) {
      throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
    }

    await this.prisma.transaction.delete({
      where: {
        id: Number(transaction_id),
        user_id: user.id,
      },
    });

    await this.redis.del(`user:${user.id}:transactions`);

    return {
      status: HttpStatus.OK,
      message: 'Transaction deleted successfully',
      data: {
        user: {
          ...user,
        },
        transaction: {
          ...transaction,
        },
      },
    };
  }
}
