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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const typeorm_2 = require("typeorm");
const tag_entity_1 = require("./entities/tag.entity");
const category_entity_1 = require("../category/entities/category.entity");
let ProductService = class ProductService {
    constructor(productsRepository, tagsRepository, categoriesRepository) {
        this.productsRepository = productsRepository;
        this.tagsRepository = tagsRepository;
        this.categoriesRepository = categoriesRepository;
    }
    async addProduct(productDto) {
        const checkProduct = await this.productsRepository.findOne({
            where: {
                name: productDto.name
            }
        });
        if (checkProduct) {
            throw new common_1.HttpException("Product's name already exists", common_1.HttpStatus.CONFLICT);
        }
        const checkCategory = await this.categoriesRepository.findOne({ where: { id: productDto.categoryId } });
        if (!checkCategory) {
            throw new common_1.HttpException("Category not found", common_1.HttpStatus.CONFLICT);
        }
        const tags = await this.tagsRepository.findBy({ id: (0, typeorm_2.In)([productDto.tagId]) });
        if (tags.length !== productDto.tagId.length) {
            throw new common_1.HttpException("Tags not found!", common_1.HttpStatus.NOT_FOUND);
        }
        const newProduct = this.productsRepository.create({
            ...productDto,
            category: checkCategory,
            tags: tags
        });
        await this.productsRepository.save(newProduct);
        return newProduct;
    }
    async updateProduct(id, productDto) {
        const checkProduct = await this.productsRepository.findOne({ where: { id }, relations: ['tags'] });
        if (!checkProduct) {
            throw new common_1.HttpException("Product not found!", common_1.HttpStatus.NOT_FOUND);
        }
        const checkCategory = await this.categoriesRepository.findOne({ where: { id } });
        if (!checkCategory) {
            throw new common_1.HttpException("Category not found!", common_1.HttpStatus.NOT_FOUND);
        }
        let newTags = [];
        if (productDto.tagId && productDto.tagId.length > 0) {
            newTags = await this.tagsRepository.findBy({ id: (0, typeorm_2.In)([productDto.tagId]) });
        }
        checkProduct.name = productDto.name;
        checkProduct.description = productDto.description;
        checkProduct.user_gender = productDto.user_gender;
        checkProduct.category = checkCategory;
        checkProduct.tags = newTags;
        await this.productsRepository.save(checkProduct);
        return checkProduct;
    }
    async getAllProduct(query) {
        const items_per_page = query.items_per_page || 10;
        const page = Number(query.page) || 1;
        const skip = (page - 1) * items_per_page;
        const whereCondition = {
            is_delete: false,
            ...(query.search && {
                name: (0, typeorm_2.Like)(`%${query.search}%`),
            }),
            ...(query.categoryId && {
                category: {
                    id: query.categoryId
                }
            }),
            ...(query.colorId && {
                colors: {
                    id: query.categoryId
                }
            }),
            ...(query.sizeId && {
                sizes: {
                    id: query.sizeId
                }
            }),
        };
        if (query.from !== undefined && query.to !== undefined) {
            whereCondition.variant = {
                price: (0, typeorm_2.Between)(query.from, query.to)
            };
        }
        const [res, total] = await this.productsRepository.findAndCount({
            take: items_per_page,
            skip: skip,
            where: whereCondition,
            relations: ['tags', 'variant', 'variant.thumbnail', 'category', 'variant.colors', 'variant.sizes'],
            select: {
                id: true, name: true, description: true, user_gender: true, is_delete: true,
                tags: {
                    id: true, name: true
                },
                variant: {
                    id: true, SKU: true, images: true, price: true, stock_quantity: true, material: true, discount: true,
                    thumbnail: {
                        id: true, thumbnail: true
                    },
                    colors: {
                        id: true, name: true
                    },
                    sizes: {
                        id: true, name: true
                    }
                },
                category: {
                    id: true, name: true
                }
            }
        });
        const last_page = Math.ceil(total / items_per_page);
        const prev_page = page - 1 < 1 ? null : page - 1;
        const next_page = page + 1 > last_page ? null : page + 1;
        return {
            total,
            data: res,
            prev_page,
            next_page,
            last_page
        };
    }
    async getOneProduct(id) {
        return await this.productsRepository.findOne({
            where: { id },
            relations: ['tags', 'variant', 'variant.thumbnail', 'variant.colors', 'variant.sizes'],
            select: {
                id: true, name: true, description: true, user_gender: true, is_delete: true,
                tags: {
                    id: true, name: true
                },
                variant: {
                    id: true, SKU: true, images: true, price: true, stock_quantity: true, material: true,
                    colors: {
                        id: true, name: true
                    },
                    sizes: {
                        id: true, name: true
                    },
                    thumbnail: {
                        id: true, thumbnail: true
                    }
                }
            }
        });
    }
    async deleteOneProduct(id) {
        const checkProduct = await this.productsRepository.findOne({ where: { id } });
        if (!checkProduct) {
            throw new common_1.HttpException("Product not found!", common_1.HttpStatus.NOT_FOUND);
        }
        return await this.productsRepository.createQueryBuilder()
            .update(product_entity_1.Product)
            .set({ is_delete: true })
            .where("id = :id", { id })
            .execute();
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(tag_entity_1.Tag)),
    __param(2, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=product.service.js.map