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
exports.ColorController = void 0;
const common_1 = require("@nestjs/common");
const color_service_1 = require("./color.service");
const color_dto_1 = require("./dto/color.dto");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
const auth_admin_guard_1 = require("../auth/auth.admin.guard");
const color_filter_dto_1 = require("./dto/color-filter.dto");
let ColorController = class ColorController {
    constructor(colorService) {
        this.colorService = colorService;
    }
    async addColor(colorDto, res) {
        try {
            const newColor = await this.colorService.addColor(colorDto);
            return res.status(common_1.HttpStatus.CREATED).json({
                code: common_1.HttpStatus.CREATED,
                message: 'Color added successfully',
                data: newColor
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                code: common_1.HttpStatus.BAD_REQUEST,
                message: error.message,
            });
        }
    }
    async getAllColor(res) {
        const listColors = await this.colorService.getAllColor();
        return res.status(common_1.HttpStatus.OK).json({
            code: common_1.HttpStatus.OK,
            message: 'Successfully!',
            data: listColors
        });
    }
    async getOneColor(res, id, query) {
        try {
            const result = await this.colorService.getOneColor(Number(id), query);
            return res.status(common_1.HttpStatus.OK).json({
                code: common_1.HttpStatus.OK,
                message: 'Successfully!',
                data: result
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.BAD_GATEWAY).json({
                code: common_1.HttpStatus.BAD_REQUEST,
                message: error.message
            });
        }
    }
};
exports.ColorController = ColorController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'add successfully' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Color already exists' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'error' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, auth_admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [color_dto_1.ColorDto, Object]),
    __metadata("design:returntype", Promise)
], ColorController.prototype, "addColor", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'error' }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ColorController.prototype, "getAllColor", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'error' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, color_filter_dto_1.ProductColorFilterDto]),
    __metadata("design:returntype", Promise)
], ColorController.prototype, "getOneColor", null);
exports.ColorController = ColorController = __decorate([
    (0, swagger_1.ApiTags)('color'),
    (0, common_1.Controller)('color'),
    __metadata("design:paramtypes", [color_service_1.ColorService])
], ColorController);
//# sourceMappingURL=color.controller.js.map