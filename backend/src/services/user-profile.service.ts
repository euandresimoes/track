import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { ApiResponse } from 'src/models/api-response.model';

export class UserProfileResponseDto {
  id: number;
  display_name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

@Injectable()
export class UserProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(user_id: string | number): Promise<ApiResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: Number(user_id),
      },
      select: {
        id: true,
        display_name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return {
      status: HttpStatus.OK,
      message: 'User profile found successfully',
      data: {
        user: {
          ...user,
        },
      },
    };
  }
}
