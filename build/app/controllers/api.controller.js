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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiController = void 0;
const core_1 = require("@foal/core");
const entities_1 = require("../entities");
const services_1 = require("../services");
class ApiController {
    async index(ctx) {
        const transactions = await this.bscscanApi.listTransactions();
        return new core_1.HttpResponseOK({ transactions });
    }
    async procesarTransacciones(ctx) {
        const transactions = await this.bscscanApi.listTransactions();
        this.transactionsServices.processTransactions(transactions);
        return new core_1.HttpResponseOK({ transactions });
    }
    async readBalance({ request }) {
        const Id = request.params;
        console.log(Id);
        const balance = await entities_1.Wallet.find({ where: { id: Id.id } });
        return new core_1.HttpResponseOK(balance);
    }
}
__decorate([
    core_1.dependency,
    __metadata("design:type", services_1.BscScanApi)
], ApiController.prototype, "bscscanApi", void 0);
__decorate([
    core_1.dependency,
    __metadata("design:type", services_1.Transactions)
], ApiController.prototype, "transactionsServices", void 0);
__decorate([
    (0, core_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.Context]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "index", null);
__decorate([
    (0, core_1.Get)('/procesar'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.Context]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "procesarTransacciones", null);
__decorate([
    (0, core_1.Get)('/getBalance/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.Context]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "readBalance", null);
exports.ApiController = ApiController;
//# sourceMappingURL=api.controller.js.map