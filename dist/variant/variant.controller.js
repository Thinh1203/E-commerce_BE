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
exports.VariantController = void 0;
const common_1 = require("@nestjs/common");
const variant_service_1 = require("./variant.service");
const variant_dto_1 = require("./dto/variant.dto");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
const auth_admin_guard_1 = require("../auth/auth.admin.guard");
let VariantController = class VariantController {
    constructor(variantService) {
        this.variantService = variantService;
    }
    async addProduct(files, variantDto, res) {
        try {
            const newProductVariant = await this.variantService.addProductVariant(variantDto, files);
            return res.status(common_1.HttpStatus.CREATED).json({
                code: common_1.HttpStatus.CREATED,
                message: 'Added successfully',
                data: newProductVariant
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                code: common_1.HttpStatus.BAD_REQUEST,
                message: error.message,
            });
        }
    }
    async updateProductVariant(id, variantDto, res) {
        try {
            const result = await this.variantService.updateProductVariant(Number(id), variantDto);
            return res.status(common_1.HttpStatus.OK).json({
                code: common_1.HttpStatus.CREATED,
                message: 'Updated successfully',
                data: result
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
exports.VariantController = VariantController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                SKU: { type: 'string' },
                price: { type: 'number' },
                stock_quantity: { type: 'number' },
                material: { type: 'number' },
                colorId: { type: 'number' },
                sizeId: { type: 'number' },
                productId: { type: 'number' },
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    }
                },
            },
            required: ['SKU', 'price', 'stock_quantity', 'material', 'colorId', 'sizeId', 'productId', 'files'],
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'error' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, auth_admin_guard_1.AdminGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 5)),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, variant_dto_1.VariantDto, Object]),
    __metadata("design:returntype", Promise)
], VariantController.prototype, "addProduct", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Variant not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'error' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, auth_admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, variant_dto_1.VariantDto, Object]),
    __metadata("design:returntype", Promise)
], VariantController.prototype, "updateProductVariant", null);
exports.VariantController = VariantController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('variant'),
    (0, common_1.Controller)('variant'),
    __metadata("design:paramtypes", [variant_service_1.VariantService])
], VariantController);
//# sourceMappingURL=variant.controller.js.map