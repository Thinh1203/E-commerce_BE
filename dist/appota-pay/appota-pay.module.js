"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppotaPayModule = void 0;
const common_1 = require("@nestjs/common");
const appota_pay_service_1 = require("./appota-pay.service");
const config_1 = require("@nestjs/config");
const appota_pay_controller_1 = require("./appota-pay.controller");
const jwt_1 = require("@nestjs/jwt");
const order_module_1 = require("../order/order.module");
let AppotaPayModule = class AppotaPayModule {
};
exports.AppotaPayModule = AppotaPayModule;
exports.AppotaPayModule = AppotaPayModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            jwt_1.JwtModule.register({
                secret: process.env.APPOTAPAY_API_SECRETKEY
            }),
            (0, common_1.forwardRef)(() => order_module_1.OrderModule)
        ],
        controllers: [appota_pay_controller_1.AppotaPayController],
        providers: [appota_pay_service_1.AppotaPayService],
        exports: [appota_pay_service_1.AppotaPayService]
    })
], AppotaPayModule);
//# sourceMappingURL=appota-pay.module.js.map