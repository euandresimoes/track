"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTransactionService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = __importDefault(require("ioredis"));
const prisma_service_1 = require("../db/prisma.service");
let DeleteTransactionService = class DeleteTransactionService {
    prisma;
    redis;
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
    }
    async execute(user_id, transaction_id) {
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
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const transaction = await this.prisma.transaction.findFirst({
            where: {
                id: Number(transaction_id),
                user_id: user.id,
            },
            select: {
                id: true,
                amount: true,
                description: true,
                type: true,
                created_at: true,
                updated_at: true,
            },
        });
        if (!transaction) {
            throw new common_1.HttpException('Transaction not found', common_1.HttpStatus.NOT_FOUND);
        }
        await this.prisma.transaction.delete({
            where: {
                id: Number(transaction_id),
                user_id: user.id,
            },
        });
        await this.redis.del(`user:${user.id}:transactions`);
        return {
            status: common_1.HttpStatus.OK,
            message: 'Transaction deleted successfully',
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
};
exports.DeleteTransactionService = DeleteTransactionService;
exports.DeleteTransactionService = DeleteTransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(ioredis_1.default)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ioredis_1.default])
], DeleteTransactionService);
//# sourceMappingURL=delete-transaction.service.js.map