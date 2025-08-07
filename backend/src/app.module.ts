import { Module } from '@nestjs/common';
import { UserModule } from './functions/modules/user.module';
import { PrismaModule } from './db/prisma.module';
import { JwtModule } from './utils/jwt/jwt.module';

@Module({
  imports: [UserModule, PrismaModule, JwtModule],
})
export class AppModule {}
