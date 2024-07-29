"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./users/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./users/entities/user.entity");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const product_module_1 = require("./product/product.module");
const product_entity_1 = require("./product/entities/product.entity");
const variant_entity_1 = require("./product/entities/variant.entity");
const thumbnail_entity_1 = require("./product/entities/thumbnail.entity");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
const tag_entity_1 = require("./product/entities/tag.entity");
const tag_module_1 = require("./tag/tag.module");
const variant_module_1 = require("./variant/variant.module");
const order_module_1 = require("./order/order.module");
const order_entity_1 = require("./order/entities/order.entity");
const orderItem_entity_1 = require("./order/entities/orderItem.entity");
const category_module_1 = require("./category/category.module");
const category_entity_1 = require("./category/entities/category.entity");
const size_module_1 = require("./size/size.module");
const color_module_1 = require("./color/color.module");
const color_entity_1 = require("./color/entities/color.entity");
const size_entity_1 = require("./size/entities/size.entity");
const email_module_1 = require("./email/email.module");
const queue_module_1 = require("./queue/queue.module");
const appota_pay_module_1 = require("./appota-pay/appota-pay.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: process.env.TYPE,
                host: process.env.HOST,
                port: parseInt(process.env.PORT, 10),
                username: process.env.USER_NAME,
                password: process.env.PASSWORD,
                database: process.env.DATABASE_NAME,
                entities: [user_entity_1.User, product_entity_1.Product, variant_entity_1.Variant, thumbnail_entity_1.Thumbnail, tag_entity_1.Tag, order_entity_1.Order, orderItem_entity_1.OrderItem, category_entity_1.Category, color_entity_1.Color, size_entity_1.Size],
                synchronize: true,
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            config_1.ConfigModule,
            product_module_1.ProductModule,
            cloudinary_module_1.CloudinaryModule,
            tag_module_1.TagModule,
            variant_module_1.VariantModule,
            order_module_1.OrderModule,
            category_module_1.CategoryModule,
            size_module_1.SizeModule,
            color_module_1.ColorModule,
            email_module_1.EmailModule,
            queue_module_1.QueueModule,
            appota_pay_module_1.AppotaPayModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map