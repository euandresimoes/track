import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IsEmail, IsString, Length, Matches } from 'class-validator';
import { PrismaService } from 'src/db/prisma.service';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequestDto {
  @ApiProperty({
    description: 'Display name',
    example: 'John Doe',
  })
  @IsString()
  @Length(3, 20)
  @Matches(/^[a-zA-Z0-9_]+$/)
  display_name: string;
  @ApiProperty({
    description: 'Email',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  @Length(3, 50)
  email: string;
  @ApiProperty({
    description: 'Password',
    example: 'Password123!',
  })
  @IsString()
  @Length(8, 20)
  @Matches(/^[a-zA-Z0-9_@*!]+$/)
  password: string;
}

@Injectable()
export class RegisterService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(dto: RegisterRequestDto) {
    const { display_name, email, password } = dto;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.prisma.user.create({
      data: {
        display_name,
        email,
        password: hashedPassword,
      },
    });
  }
}
