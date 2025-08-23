import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive,
  IsDecimal,
  IsDate,
  IsEnum,
  IsString,
  Length,
} from 'class-validator';
import Redis from 'ioredis';
import { PrismaService } from 'src/db/prisma.service';
import { ApiResponse } from 'src/models/api-response.model';
import { BillStatus } from 'src/models/enums/bill-status.enum';

export class UpdateBillRequestDto {
  @IsNumber()
  @IsPositive()
  @IsDecimal({
    decimal_digits: '2',
  })
  @ApiProperty({
    example: 100,
    description: 'Bill amount',
  })
  amount?: number;

  @IsString()
  @Length(1, 20)
  @ApiProperty({
    example: 'Bill description',
    description: 'Bill description',
  })
  description?: string;

  @IsEnum(BillStatus)
  @ApiProperty({
    example: 'PENDING',
    description: 'Bill status | PENDING | PAID | OVERDUE',
  })
  status?: BillStatus;

  @IsDate()
  @ApiProperty({
    example: '2025-08-23',
    description: 'Bill due date',
  })
  due_date?: Date;
}

@Injectable()
export class UpdateBillService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(Redis) private readonly redis: Redis,
  ) {}

  async execute(
    userId: number | string,
    billId: number,
    data: UpdateBillRequestDto,
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

    const bill = await this.prisma.bill.findUnique({
      where: {
        id: Number(billId),
        user_id: Number(userId),
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

    await this.prisma.bill.update({
      where: {
        id: bill.id,
        user_id: user.id,
      },
      data: {
        amount: data.amount ? data.amount : undefined,
        description: data.description ? data.description : undefined,
        due_date: data.due_date ? new Date(data.due_date) : undefined,
        status: data.status ? data.status : undefined,
      },
    });

    await this.redis.del(`user:${userId}:bills`);

    return {
      status: HttpStatus.OK,
      message: 'Bill updated successfully',
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
