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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_dto_1 = require("./dto/order.dto");
const order_service_1 = require("./order.service");
const auth_guard_1 = require("../auth/auth.guard");
const order_filter_dto_1 = require("./dto/order-filter.dto");
const auth_admin_guard_1 = require("../auth/auth.admin.guard");
const swagger_1 = require("@nestjs/swagger");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async getAllOrderHistory(res, req) {
        try {
            const user = req['user'];
            const OrderHistory = await this.orderService.getAllOrderHistory(Number(user.id));
            return res.status(common_1.HttpStatus.OK).json({
                code: common_1.HttpStatus.OK,
                message: 'Order History',
                data: OrderHistory
            });
        }
        catch (error) {
            console.error('Error fetching order history:', error);
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                code: common_1.HttpStatus.BAD_GATEWAY,
                message: error.message
            });
        }
    }
    async addOrder(orderDto, res, req) {
        try {
            const user = req['user'];
            const newProduct = await this.orderService.addOrder(orderDto, Number(user.id));
            return res.status(common_1.HttpStatus.CREATED).json({
                code: common_1.HttpStatus.CREATED,
                message: 'Order added successfully',
                data: newProduct
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                code: common_1.HttpStatus.BAD_REQUEST,
                message: error.message,
            });
        }
    }
    async deleteOrder(id, res) {
        try {
            const is_Delete = await this.orderService.deleteOrder(Number(id));
            return res.status(common_1.HttpStatus.OK).json({
                code: common_1.HttpStatus.NO_CONTENT,
                message: 'Delete successfully ',
                data: is_Delete
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                code: common_1.HttpStatus.BAD_REQUEST,
                message: error.message,
            });
        }
    }
    async getAllOrder(res, query) {
        try {
            const listOrder = await this.orderService.getAllOrder(query);
            return res.status(common_1.HttpStatus.OK).json({
                code: common_1.HttpStatus.OK,
                message: 'List order',
                data: listOrder
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                code: common_1.HttpStatus.BAD_GATEWAY,
                message: error.message
            });
        }
    }
    async getOneOrder(res, id) {
        try {
            const orderDetail = await this.orderService.getOneOrder(Number(id));
            return res.status(common_1.HttpStatus.OK).json({
                code: common_1.HttpStatus.OK,
                message: 'Order detail',
                data: orderDetail
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                code: common_1.HttpStatus.BAD_GATEWAY,
                message: error.message
            });
        }
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Get)('history'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'error' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllOrderHistory", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'order Successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'error' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.OrderDto, Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "addOrder", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'delete Successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'error' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "deleteOrder", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'error' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, auth_admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, order_filter_dto_1.OrderFilterDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllOrder", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'error' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOneOrder", null);
exports.OrderController = OrderController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('order'),
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map