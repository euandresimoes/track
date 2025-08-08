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
exports.FindAllTransactionsService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = __importDefault(require("ioredis"));
const prisma_service_1 = require("../db/prisma.service");
let FindAllTransactionsService = class FindAllTransactionsService {
    prisma;
    redis;
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
    }
    async execute(user_id) {
        const cachedTransactions = await this.redis.get(`user:${user_id}:transactions`);
        if (cachedTransactions) {
            return JSON.parse(cachedTransactions);
        }
        const transactions = await this.prisma.transaction.findMany({
            where: {
                user_id: Number(user_id),
            },
        });
        await this.redis.set(`user:${user_id}:transactions`, JSON.stringify(transactions), 'EX', 3600);
        return transactions;
    }
};
exports.FindAllTransactionsService = FindAllTransactionsService;
exports.FindAllTransactionsService = FindAllTransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(ioredis_1.default)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ioredis_1.default])
], FindAllTransactionsService);
//# sourceMappingURL=find-all-transactions.service.js.map