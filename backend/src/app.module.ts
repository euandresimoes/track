import { Module } from '@nestjs/common';
import { PrismaModule } from './db/prisma.module';
import { JwtModule } from './utils/jwt/jwt.module';
import { RedisModule } from './utils/redis/redis.module';
import { BillModule } from './services/modules/bill.module';
import { TransactionModule } from './services/modules/transaction.module';
import { UserModule } from './services/modules/user.module';

@Module({
  imports: [
    UserModule,
    TransactionModule,
    BillModule,
    PrismaModule,
    JwtModule,
    RedisModule,
  ],
})
export class AppModule {}
