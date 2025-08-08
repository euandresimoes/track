"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModule = void 0;
const common_1 = require("@nestjs/common");
const create_transaction_service_1 = require("../create-transaction.service");
const create_transaction_controller_1 = require("../../routes/create-transaction.controller");
const delete_transaction_service_1 = require("../delete-transaction.service");
const delete_transaction_controller_1 = require("../../routes/delete-transaction.controller");
const find_all_transactions_service_1 = require("../find-all-transactions.service");
const find_all_transactions_controller_1 = require("../../routes/find-all-transactions.controller");
let TransactionModule = class TransactionModule {
};
exports.TransactionModule = TransactionModule;
exports.TransactionModule = TransactionModule = __decorate([
    (0, common_1.Module)({
        providers: [
            create_transaction_service_1.CreateTransactionService,
            delete_transaction_service_1.DeleteTransactionService,
            find_all_transactions_service_1.FindAllTransactionsService,
        ],
        controllers: [
            create_transaction_controller_1.CreateTransactionController,
            delete_transaction_controller_1.DeleteTransactionController,
            find_all_transactions_controller_1.FindAllTransactionsController,
        ],
    })
], TransactionModule);
//# sourceMappingURL=transaction.module.js.map