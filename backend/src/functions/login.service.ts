import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from 'src/utils/jwt/jwt.service';

export class LoginRequestDto {
  email: string;
  password: string;
}

export class LoginResponseDto {
  access_token: string;
}

@Injectable()
export class LoginService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: LoginRequestDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
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
      access_token: token,
    };
  }
}
