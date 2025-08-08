import { Provider } from '@nestjs/common';
import Redis from 'ioredis';

export const RedisProvider: Provider = {
  provide: Redis,
  useFactory: () =>
    new Redis({
      port: 6379,
      host: (process.env.REDIS_HOST as string) || 'localhost',
    }),
};
