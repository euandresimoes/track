"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterService = exports.RegisterRequestDto = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const prisma_service_1 = require("../db/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const swagger_1 = require("@nestjs/swagger");
class RegisterRequestDto {
    display_name;
    email;
    password;
}
exports.RegisterRequestDto = RegisterRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Display name',
        example: 'John Doe',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 20),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_]+$/),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "display_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email',
        example: 'johndoe@example.com',
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Length)(3, 50),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Password',
        example: 'Password123!',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(8, 20),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_@*!]+$/),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "password", void 0);
let RegisterService = class RegisterService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async execute(dto) {
        const { display_name, email, password } = dto;
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
            },
        });
        if (user) {
            throw new common_1.HttpException('Email already exists', common_1.HttpStatus.CONFLICT);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.prisma.user.create({
            data: {
                display_name,
                email,
                password: hashedPassword,
            },
        });
        const userCreated = await this.prisma.user.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
            },
        });
        return {
            status: common_1.HttpStatus.CREATED,
            message: 'User created successfully',
            data: {
                user: {
                    id: userCreated.id,
                    display_name,
                    email,
                },
            },
        };
    }
};
exports.RegisterService = RegisterService;
exports.RegisterService = RegisterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RegisterService);
//# sourceMappingURL=register.service.js.map