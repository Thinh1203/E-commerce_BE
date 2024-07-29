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
exports.TagController = void 0;
const common_1 = require("@nestjs/common");
const tag_service_1 = require("./tag.service");
const tag_dto_1 = require("./dto/tag.dto");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
const auth_admin_guard_1 = require("../auth/auth.admin.guard");
let TagController = class TagController {
    constructor(tagService) {
        this.tagService = tagService;
    }
    async addTag(tagDto, res) {
        try {
            const newTag = await this.tagService.addTag(tagDto);
            return res.status(common_1.HttpStatus.CREATED).json({
                code: common_1.HttpStatus.CREATED,
                message: 'Tag added successfully',
                data: newTag
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                code: common_1.HttpStatus.BAD_REQUEST,
                message: error.message,
            });
        }
    }
    async getAllTag(res) {
        const listTags = await this.tagService.getAllTag();
        return res.status(common_1.HttpStatus.OK).json({
            code: common_1.HttpStatus.OK,
            message: 'Successfully!',
            data: listTags
        });
    }
};
exports.TagController = TagController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'add successfully' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'tag already exists' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'error' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, auth_admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tag_dto_1.TagDto, Object]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "addTag", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'error' }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "getAllTag", null);
exports.TagController = TagController = __decorate([
    (0, swagger_1.ApiTags)('tag'),
    (0, common_1.Controller)('tag'),
    __metadata("design:paramtypes", [tag_service_1.TagService])
], TagController);
//# sourceMappingURL=tag.controller.js.map