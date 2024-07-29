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
exports.AppotaPayController = void 0;
const common_1 = require("@nestjs/common");
const appota_pay_service_1 = require("./appota-pay.service");
let AppotaPayController = class AppotaPayController {
    constructor(appotaPayService) {
        this.appotaPayService = appotaPayService;
    }
    async paymentResult(data, signature, res) {
        try {
            const result = await this.appotaPayService.processingReturnedResult(data, signature);
            return res.status(common_1.HttpStatus.CREATED).json({ result });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.BAD_GATEWAY).json({ message: 'Payment fail' });
        }
    }
};
exports.AppotaPayController = AppotaPayController;
__decorate([
    (0, common_1.Get)('redirect'),
    __param(0, (0, common_1.Query)('data')),
    __param(1, (0, common_1.Query)('signature')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AppotaPayController.prototype, "paymentResult", null);
exports.AppotaPayController = AppotaPayController = __decorate([
    (0, common_1.Controller)('appotapay'),
    __metadata("design:paramtypes", [appota_pay_service_1.AppotaPayService])
], AppotaPayController);
//# sourceMappingURL=appota-pay.controller.js.map