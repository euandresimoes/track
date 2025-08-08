"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisProvider = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
exports.RedisProvider = {
    provide: ioredis_1.default,
    useFactory: () => new ioredis_1.default({
        port: 6379,
        host: process.env.REDIS_HOST || 'localhost',
    }),
};
//# sourceMappingURL=redis.provider.js.map