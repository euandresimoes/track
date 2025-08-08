import { Module } from '@nestjs/common';
import { UserModule } from './functions/modules/user.module';
import { PrismaModule } from './db/prisma.module';
import { JwtModule } from './utils/jwt/jwt.module';
import { TransactionModule } from './functions/modules/transaction.module';
import { RedisModule } from './utils/redis/redis.module';

@Module({
  imports: [
    UserModule,
    TransactionModule,
    PrismaModule,
    JwtModule,
    RedisModule,
  ],
})
export class AppModule {}
