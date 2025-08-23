import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDecimal,
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import Redis from 'ioredis';
import { PrismaService } from 'src/db/prisma.service';
import { ApiResponse } from 'src/models/api-response.model';
import { BillStatus } from 'src/models/enums/bill-status.enum';

export class CreateBillRequestDto {
  @ApiProperty({
    example: 100,
    description: 'Bill amount',
  })
  @IsPositive()
  @IsNumber()
  @IsDecimal({
    decimal_digits: '2',
  })
  amount: number;

  @ApiProperty({
    example: 'Bill description',
    description: 'Bill description',
  })
  @IsString()
  @Length(1, 20)
  description: string;

  @ApiProperty({
    example: '2025-08-23',
    description: 'Bill due date',
  })
  @IsDate()
  due_date: Date;

  @ApiProperty({
    example: 'PENDING',
    description: 'Bill status | PENDING | PAID | OVERDUE',
  })
  @IsEnum(BillStatus)
  status: BillStatus;
}

@Injectable()
export class CreateBillService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(Redis) private readonly redis: Redis,
  ) {}

  async execute(
    userId: string | number,
    data: CreateBillRequestDto,
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

    await this.prisma.bill.create({
      data: {
        user: {
          connect: {
            id: Number(userId),
          },
        },
        amount: data.amount,
        description: data.description,
        due_date: new Date(data.due_date),
        status: data.status,
      },
    });

    await this.redis.del(`user:${userId}:bills`);

    const bill = await this.prisma.bill.findUnique({
      where: {
        id: user.id,
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

    return {
      status: HttpStatus.CREATED,
      message: 'Bill created successfully',
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
