import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { PrismaService } from 'src/db/prisma.service';
import { ApiResponse } from 'src/models/api-response.model';

@Injectable()
export class FindAllBillsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(Redis) private readonly redis: Redis,
  ) {}

  async execute(userId: number | string): Promise<ApiResponse> {
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

    const cachedBills = await this.redis.get(`user:${userId}:bills`);

    if (cachedBills) {
      return {
        status: HttpStatus.OK,
        message: 'Bills found successfully',
        data: {
          user: {
            ...user,
          },
          bills: JSON.parse(cachedBills),
        },
      };
    }

    const bills = await this.prisma.bill.findMany({
      where: {
        user_id: user.id,
      },
    });

    await this.redis.set(
      `user:${userId}:bills`,
      JSON.stringify(bills),
      'EX',
      3600,
    );

    return {
      status: HttpStatus.OK,
      message: 'Bills found successfully',
      data: {
        user: {
          ...user,
        },
        bills,
      },
    };
  }
}
