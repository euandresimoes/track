import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { PrismaService } from 'src/db/prisma.service';
import { ApiResponse } from 'src/models/api-response.model';

@Injectable()
export class DeleteBillService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(Redis) private readonly redis: Redis,
  ) {}

  async execute(
    userId: string | number,
    billId: number | string,
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

    const bill = await this.prisma.bill.findFirst({
      where: {
        id: Number(billId),
        user_id: user.id,
      },
      select: {
        id: true,
        user_id: true,
        amount: true,
        description: true,
        due_date: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!bill) {
      throw new HttpException('Bill not found', HttpStatus.NOT_FOUND);
    }

    await this.prisma.bill.delete({
      where: {
        id: Number(billId),
        user_id: Number(userId),
      },
    });

    await this.redis.del(`user:${userId}:bills`);

    return {
      status: HttpStatus.OK,
      message: 'Bill deleted successfully',
      data: {
        user: {
          ...user,
        },
        bill: {
          ...bill,
        },
      },
    };
  }
}
