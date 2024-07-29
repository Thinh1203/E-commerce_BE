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
exports.VariantService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const typeorm_1 = require("@nestjs/typeorm");
const variant_entity_1 = require("../product/entities/variant.entity");
const typeorm_2 = require("typeorm");
const thumbnail_entity_1 = require("../product/entities/thumbnail.entity");
const product_entity_1 = require("../product/entities/product.entity");
const size_entity_1 = require("../size/entities/size.entity");
const color_entity_1 = require("../color/entities/color.entity");
let VariantService = class VariantService {
    constructor(cloudinaryService, variantRepository, thumbnailRepository, productRepository, sizeRepository, colorRepository) {
        this.cloudinaryService = cloudinaryService;
        this.variantRepository = variantRepository;
        this.thumbnailRepository = thumbnailRepository;
        this.productRepository = productRepository;
        this.sizeRepository = sizeRepository;
        this.colorRepository = colorRepository;
    }
    async addProductVariant(variantDto, files) {
        const checkProduct = await this.productRepository.findOne({
            where: { id: variantDto.productId }
        });
        if (!checkProduct) {
            throw new common_1.HttpException("Product not found!", common_1.HttpStatus.NOT_FOUND);
        }
        const checkSize = await this.sizeRepository.findOne({
            where: { id: variantDto.sizeId }
        });
        if (!checkSize) {
            throw new common_1.HttpException("Size not found!", common_1.HttpStatus.NOT_FOUND);
        }
        const checkColor = await this.colorRepository.findOne({
            where: { id: variantDto.colorId }
        });
        if (!checkColor) {
            throw new common_1.HttpException("Color not found!", common_1.HttpStatus.NOT_FOUND);
        }
        const imagesUpload = files.map((file, index) => {
            if (index === 0) {
                return this.cloudinaryService.uploadFile(file, 800, 800);
            }
            else {
                return this.cloudinaryService.uploadFile(file, 300, 300);
            }
        });
        const uploadResults = await Promise.all(imagesUpload);
        const imageUrls = uploadResults.map(result => result.url);
        const newVariantProduct = await this.variantRepository.save({
            images: imageUrls[0],
            material: variantDto.material,
            price: variantDto.price,
            stock_quantity: variantDto.stock_quantity,
            SKU: variantDto.SKU,
            product: checkProduct,
            colors: [checkColor],
            sizes: [checkSize]
        });
        const thumbnails = imageUrls.slice(1).map(url => {
            const thumbnail = this.thumbnailRepository.create({
                thumbnail: url,
                variant: newVariantProduct
            });
            return thumbnail;
        });
        await this.thumbnailRepository.save(thumbnails);
        return newVariantProduct;
    }
    async updateProductVariant(id, data) {
        const checkProductVariant = await this.variantRepository.findOne({ where: { id } });
        if (!checkProductVariant) {
            throw new common_1.HttpException("Variant not found!", common_1.HttpStatus.NOT_FOUND);
        }
        const checkProduct = await this.productRepository.findOne({
            where: { id: data.productId }
        });
        if (!checkProduct) {
            throw new common_1.HttpException("Product not found!", common_1.HttpStatus.NOT_FOUND);
        }
        const checkColor = await this.colorRepository.findOne({ where: {
                id: data.colorId
            } });
        if (!checkColor) {
            throw new common_1.HttpException("Color not found!", common_1.HttpStatus.NOT_FOUND);
        }
        const checkSize = await this.sizeRepository.findOne({ where: {
                id: data.sizeId
            } });
        if (!checkSize) {
            throw new common_1.HttpException("Size not found!", common_1.HttpStatus.NOT_FOUND);
        }
        return await this.variantRepository.createQueryBuilder()
            .update(variant_entity_1.Variant)
            .set({
            SKU: data.SKU,
            images: checkProductVariant.images,
            stock_quantity: data.stock_quantity,
            material: data.material,
            price: data.price,
            product: checkProduct,
            colors: [checkColor],
            sizes: [checkSize]
        })
            .where("id = :id", { id })
            .execute();
    }
};
exports.VariantService = VariantService;
exports.VariantService = VariantService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(variant_entity_1.Variant)),
    __param(2, (0, typeorm_1.InjectRepository)(thumbnail_entity_1.Thumbnail)),
    __param(3, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(4, (0, typeorm_1.InjectRepository)(size_entity_1.Size)),
    __param(5, (0, typeorm_1.InjectRepository)(color_entity_1.Color)),
    __metadata("design:paramtypes", [cloudinary_service_1.CloudinaryService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], VariantService);
//# sourceMappingURL=variant.service.js.map