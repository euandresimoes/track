import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { TransactionType } from './enums/transaction-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDecimal,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import Redis from 'ioredis';
import { ApiResponse } from 'src/models/api-response.model';

export class TransactionCreateRequestDto {
  @ApiProperty({
    description: 'Transaction amount',
    example: 100,
  })
  @IsPositive()
  @IsNumber()
  @IsDecimal({
    decimal_digits: '2',
  })
  amount: number;
  @ApiProperty({
    description: 'Transaction description',
    example: 'Buying a product',
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  description: string;
  @ApiProperty({
    description: 'Transaction type',
    example: TransactionType.EXPENSE,
  })
  @IsEnum(TransactionType)
  type: TransactionType;
}

@Injectable()
export class CreateTransactionService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(Redis) private readonly redis: Redis,
  ) {}

  async execute(
    user_id: number | string,
    data: TransactionCreateRequestDto,
  ): Promise<ApiResponse> {
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

    await this.prisma.transaction.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        amount: data.amount,
        description: data.description,
        type: data.type,
      },
    });

    await this.redis.del(`user:${user_id}:transactions`);

    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        user_id: true,
        amount: true,
        description: true,
        type: true,
        created_at: true,
        updated_at: true,
      },
    });

    return {
      status: HttpStatus.CREATED,
      message: 'Transaction created successfully',
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
