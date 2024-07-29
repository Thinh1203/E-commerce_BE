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
exports.AppotaPayService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
const crypto = require("crypto");
const jwt_1 = require("@nestjs/jwt");
const order_service_1 = require("../order/order.service");
let AppotaPayService = class AppotaPayService {
    constructor(configService, jwtService, orderService) {
        this.configService = configService;
        this.jwtService = jwtService;
        this.orderService = orderService;
        this.ksort = (obj) => {
            let keys = Object.keys(obj).sort();
            let sortedObj = {};
            for (let i in keys) {
                sortedObj[keys[i]] = obj[keys[i]];
            }
            return sortedObj;
        };
        this.apiKey = this.configService.get('APPOTAPAY_API_KEY');
        this.secretKey = this.configService.get('APPOTAPAY_API_SECRETKEY');
        this.partnerKey = this.configService.get('APPOTAPAY_PARTNER_CODE');
    }
    createJWT() {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const payload = {
            iss: this.partnerKey,
            jti: `${this.apiKey}-${currentTimestamp}`,
            api_key: this.apiKey,
        };
        return this.jwtService.sign(payload);
    }
    createSignature(data) {
        return crypto.createHmac('sha256', this.secretKey).update(data).digest('hex');
    }
    async createTransaction(orderId, amount) {
        const url = 'https://payment.dev.appotapay.com/api/v2/orders/payment';
        const payload = {
            transaction: {
                amount: amount,
                currency: "VND",
                bankCode: "",
                paymentMethod: "ATM",
                action: "PAY"
            },
            partnerReference: {
                order: {
                    id: orderId,
                    info: "Payment Order",
                    extraData: ""
                },
                notificationConfig: {
                    notifyUrl: "http://localhost:4001/ipn",
                    redirectUrl: "http://localhost:4001/appotapay/redirect",
                    installmentNotifyUrl: "http://localhost:4001/appotapay/redirect"
                }
            }
        };
        const sortedKeys = this.ksort(payload);
        let signData = '';
        for (const [key, value] of Object.entries(sortedKeys)) {
            if (value !== null && value !== undefined) {
                signData += `&${key}=${encodeURIComponent(value.toString())}`;
            }
        }
        signData = signData.substring(1);
        const signature = this.createSignature(signData);
        payload['signature'] = signature;
        const jwt = this.createJWT();
        const headers = {
            'X-APPOTAPAY-AUTH': jwt,
            'Content-Type': 'application/json',
            'X-Language': 'vi'
        };
        try {
            const response = await axios_1.default.post(url, payload, { headers });
            return response.data;
        }
        catch (error) {
            console.log(error.response.data);
            throw new Error(error.response?.data?.message || error.message);
        }
    }
    async processingReturnedResult(data, signature) {
        try {
            const decodeReturnedData = Buffer.from(data, 'base64').toString('utf-8');
            let jsonData;
            jsonData = JSON.parse(decodeReturnedData);
            if (jsonData.transaction.status === 'success') {
                return await this.orderService.processingReturnedResult(Number(jsonData.partnerReference.order.id));
            }
            return { status: common_1.HttpStatus.BAD_GATEWAY, message: 'Payment fail' };
        }
        catch (error) {
            return { message: 'Invalid data' };
        }
    }
};
exports.AppotaPayService = AppotaPayService;
exports.AppotaPayService = AppotaPayService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => order_service_1.OrderService))),
    __metadata("design:paramtypes", [config_1.ConfigService,
        jwt_1.JwtService,
        order_service_1.OrderService])
], AppotaPayService);
//# sourceMappingURL=appota-pay.service.js.map