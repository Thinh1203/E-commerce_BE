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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const product_dto_1 = require("./dto/product.dto");
const product_filter_dto_1 = require("./dto/product-filter.dto");
const auth_guard_1 = require("../auth/auth.guard");
const auth_admin_guard_1 = require("../auth/auth.admin.guard");
const swagger_1 = require("@nestjs/swagger");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async addProduct(productDto, res) {
        try {
            const newProduct = await this.productService.addProduct(productDto);
            return res.status(common_1.HttpStatus.CREATED).json({
                code: common_1.HttpStatus.CREATED,
                message: 'Product added successfully',
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
    async updateProduct(productDto, res, id) {
        try {
            const updateProduct = await this.productService.updateProduct(Number(id), productDto);
            return res.status(common_1.HttpStatus.CREATED).json({
                code: common_1.HttpStatus.CREATED,
                message: 'Update successfully',
                data: updateProduct
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                code: common_1.HttpStatus.BAD_REQUEST,
                message: error.message,
            });
        }
    }
    async getAllProduct(res, query) {
        try {
            const listProduct = await this.productService.getAllProduct(query);
            return res.status(common_1.HttpStatus.OK).json({
                code: common_1.HttpStatus.OK,
                message: 'List product',
                data: listProduct
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                code: common_1.HttpStatus.BAD_GATEWAY,
                message: error.message
            });
        }
    }
    async getOneProduct(id, res) {
        try {
            const productDetail = await this.productService.getOneProduct(Number(id));
            return res.status(common_1.HttpStatus.OK).json({
                code: common_1.HttpStatus.OK,
                message: 'Product detail: ',
                data: productDetail
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                code: common_1.HttpStatus.BAD_REQUEST,
                message: error.message,
            });
        }
    }
    async deleteOneProduct(res, id) {
        try {
            const is_Delete = await this.productService.deleteOneProduct(Number(id));
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
};
exports.ProductController = ProductController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'add successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'error' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, auth_admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "addProduct", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'update successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'product not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'error' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, auth_admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProductDto, Object, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'items_per_page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'categoryId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'sizeId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'colorId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'from', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'to', required: false }),
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'error' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, product_filter_dto_1.ProductFilterDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProduct", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'product not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'error' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getOneProduct", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, auth_admin_guard_1.AdminGuard),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'update Successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'product not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'error' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteOneProduct", null);
exports.ProductController = ProductController = __decorate([
    (0, swagger_1.ApiTags)('product'),
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map