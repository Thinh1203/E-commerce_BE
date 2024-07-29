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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variant = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
const thumbnail_entity_1 = require("./thumbnail.entity");
const orderItem_entity_1 = require("../../order/entities/orderItem.entity");
const size_entity_1 = require("../../size/entities/size.entity");
const color_entity_1 = require("../../color/entities/color.entity");
let Variant = class Variant {
};
exports.Variant = Variant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Variant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Variant.prototype, "SKU", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Variant.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Variant.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Variant.prototype, "stock_quantity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Variant.prototype, "material", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Variant.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Variant.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Variant.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => thumbnail_entity_1.Thumbnail, (thumbnail) => thumbnail.variant),
    __metadata("design:type", Array)
], Variant.prototype, "thumbnail", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orderItem_entity_1.OrderItem, (orderItem) => orderItem.variant),
    __metadata("design:type", Array)
], Variant.prototype, "orderItem", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.variant),
    __metadata("design:type", product_entity_1.Product)
], Variant.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => size_entity_1.Size, (sizes) => sizes.variants),
    (0, typeorm_1.JoinTable)({
        name: 'variant_size',
        joinColumn: { name: 'variant_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'size_id' },
    }),
    __metadata("design:type", Array)
], Variant.prototype, "sizes", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => color_entity_1.Color, (colors) => colors.variants),
    (0, typeorm_1.JoinTable)({
        name: 'variant_color',
        joinColumn: { name: 'variant_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'color_id' },
    }),
    __metadata("design:type", Array)
], Variant.prototype, "colors", void 0);
exports.Variant = Variant = __decorate([
    (0, typeorm_1.Entity)()
], Variant);
//# sourceMappingURL=variant.entity.js.map