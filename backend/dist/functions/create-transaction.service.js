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
exports.CreateTransactionService = exports.TransactionCreateRequestDto = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../db/prisma.service");
const transaction_type_enum_1 = require("./enums/transaction-type.enum");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const ioredis_1 = __importDefault(require("ioredis"));
class TransactionCreateRequestDto {
    amount;
    description;
    type;
}
exports.TransactionCreateRequestDto = TransactionCreateRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Transaction amount',
        example: 100,
    }),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsDecimal)({
        decimal_digits: '2',
    }),
    __metadata("design:type", Number)
], TransactionCreateRequestDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Transaction description',
        example: 'Buying a product',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], TransactionCreateRequestDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Transaction type',
        example: transaction_type_enum_1.TransactionType.EXPENSE,
    }),
    (0, class_validator_1.IsEnum)(transaction_type_enum_1.TransactionType),
    __metadata("design:type", String)
], TransactionCreateRequestDto.prototype, "type", void 0);
let CreateTransactionService = class CreateTransactionService {
    prisma;
    redis;
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
    }
    async execute(user_id, data) {
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
        await this.prisma.transaction.create({
            data: {
                user: {
                    connect: {
                        id: user.id,
                    },
                },
                amount: data.amount,
                description: data.description,
                type: data.type,
            },
        });
        await this.redis.del(`user:${user_id}:transactions`);
        const transaction = await this.prisma.transaction.findUnique({
            where: {
                id: user.id,
            },
            select: {
                id: true,
                user_id: true,
                amount: true,
                description: true,
                type: true,
                created_at: true,
                updated_at: true,
            },
        });
        return {
            status: common_1.HttpStatus.CREATED,
            message: 'Transaction created successfully',
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
exports.CreateTransactionService = CreateTransactionService;
exports.CreateTransactionService = CreateTransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(ioredis_1.default)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ioredis_1.default])
], CreateTransactionService);
//# sourceMappingURL=create-transaction.service.js.map