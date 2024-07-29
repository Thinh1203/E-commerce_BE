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
exports.ColorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const color_entity_1 = require("./entities/color.entity");
const typeorm_2 = require("typeorm");
let ColorService = class ColorService {
    constructor(colorsRepository) {
        this.colorsRepository = colorsRepository;
    }
    async addColor(colorDto) {
        const checkColor = await this.colorsRepository.findOne({
            where: {
                name: colorDto.name
            }
        });
        if (checkColor) {
            throw new common_1.HttpException("Color already exists", common_1.HttpStatus.CONFLICT);
        }
        return await this.colorsRepository.save(colorDto);
    }
    async getAllColor() {
        return await this.colorsRepository.find({
            select: ['id', 'name']
        });
    }
    async getOneColor(id, query) {
        const checkColor = await this.colorsRepository.findOne({
            where: {
                id,
                variants: {
                    id: query.variantId
                }
            },
            relations: [
                'variants.colors',
                'variants',
                'variants.thumbnail',
                'variants.sizes'
            ]
        });
        if (!checkColor) {
            throw new common_1.HttpException("Color not found", common_1.HttpStatus.CONFLICT);
        }
        return {
            id: checkColor.id,
            name: checkColor.name,
            variant: checkColor.variants.map(element => {
                return {
                    id: element.id,
                    SKU: element.SKU,
                    price: element.price,
                    images: element.images,
                    stock_quantity: element.stock_quantity,
                    material: element.material,
                    discount: element.discount,
                    thumbnail: element.thumbnail.map(e => {
                        return {
                            id: e.id,
                            thumb: e.thumbnail
                        };
                    }),
                    size: element.sizes.map(s => {
                        return {
                            id: s.id,
                            name: s.name
                        };
                    })
                };
            })
        };
    }
};
exports.ColorService = ColorService;
exports.ColorService = ColorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(color_entity_1.Color)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ColorService);
//# sourceMappingURL=color.service.js.map