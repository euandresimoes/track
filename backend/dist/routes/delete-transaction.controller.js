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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTransactionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const delete_transaction_service_1 = require("../functions/delete-transaction.service");
const user_decorator_1 = require("../utils/decorators/user.decorator");
const jwt_guard_1 = require("../utils/jwt/jwt.guard");
let DeleteTransactionController = class DeleteTransactionController {
    service;
    constructor(service) {
        this.service = service;
    }
    async delete(user_id, transaction_id) {
        return this.service.execute(user_id, transaction_id);
    }
};
exports.DeleteTransactionController = DeleteTransactionController;
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], DeleteTransactionController.prototype, "delete", null);
exports.DeleteTransactionController = DeleteTransactionController = __decorate([
    (0, common_1.Controller)('v1/transaction/delete'),
    __metadata("design:paramtypes", [delete_transaction_service_1.DeleteTransactionService])
], DeleteTransactionController);
//# sourceMappingURL=delete-transaction.controller.js.map