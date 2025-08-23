import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from 'src/utils/jwt/jwt.service';
import { ApiProperty } from '@nestjs/swagger';
import { ApiResponse } from 'src/models/api-response.model';

export class LoginRequestDto {
  @ApiProperty({
    description: 'Email',
    example: 'johndoe@example.com',
  })
  email: string;
  @ApiProperty({
    description: 'Password',
    example: 'Password123!',
  })
  password: string;
}

@Injectable()
export class LoginService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: LoginRequestDto): Promise<ApiResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
        display_name: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    const token = this.jwtService.sign({
      id: user.id,
    });

    return {
      status: HttpStatus.OK,
      message: 'Login successful',
      data: {
        access_token: token,
        user: {
          id: user.id,
          display_name: user.display_name,
          email: user.email,
        },
      },
    };
  }
}
