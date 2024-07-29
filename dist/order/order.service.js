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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const orderItem_entity_1 = require("./entities/orderItem.entity");
const user_entity_1 = require("../users/entities/user.entity");
const variant_entity_1 = require("../product/entities/variant.entity");
const email_service_1 = require("../email/email.service");
const producer_service_1 = require("../queue/producer.service");
const appota_pay_service_1 = require("../appota-pay/appota-pay.service");
let OrderService = class OrderService {
    constructor(orderRepository, orderItemRepository, userRepository, variantRepository, producerService, emailService, appotaPayService) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.userRepository = userRepository;
        this.variantRepository = variantRepository;
        this.producerService = producerService;
        this.emailService = emailService;
        this.appotaPayService = appotaPayService;
    }
    async addOrder(orderDto, userId) {
        const checkUser = await this.userRepository.findOne({ where: { id: userId } });
        if (!checkUser) {
            throw new common_1.HttpException("User not found!", common_1.HttpStatus.NOT_FOUND);
        }
        let paymentMethod = "";
        if (orderDto.payment_method === 2) {
            if (checkUser.points < orderDto.total_price) {
                throw new common_1.HttpException("The customer does not have enough points to pay", common_1.HttpStatus.BAD_REQUEST);
            }
            paymentMethod = "point";
        }
        paymentMethod = "eWallet";
        const orderItems = [];
        for (const element of orderDto.orderData) {
            const checkProductVariant = await this.variantRepository.findOne({
                where: {
                    id: Number(element.variantId)
                },
                relations: ['colors', 'sizes', 'product']
            });
            if (!checkProductVariant) {
                throw new common_1.HttpException("Product not found!", common_1.HttpStatus.NOT_FOUND);
            }
            if (element.quantity > checkProductVariant.stock_quantity) {
                throw new common_1.HttpException("The quantity of products in stock is not enough", common_1.HttpStatus.BAD_REQUEST);
            }
            const orderItemData = new orderItem_entity_1.OrderItem();
            orderItemData.variant = checkProductVariant;
            orderItemData.price = element.price;
            orderItemData.quantity = element.quantity;
            const color = checkProductVariant.colors[0];
            const size = checkProductVariant.sizes[0];
            if (color) {
                orderItemData.color = color.name;
            }
            else {
                throw new common_1.HttpException("Color not found!", common_1.HttpStatus.NOT_FOUND);
            }
            if (size) {
                orderItemData.size = size.name;
            }
            else {
                throw new common_1.HttpException("Size not found!", common_1.HttpStatus.NOT_FOUND);
            }
            orderItems.push(orderItemData);
            checkProductVariant.stock_quantity -= element.quantity;
            await this.variantRepository.save(checkProductVariant);
        }
        const order = this.orderRepository.create({
            user: checkUser,
            quantity: orderDto.quantity,
            total_price: orderDto.total_price,
            orderItem: orderItems,
            payment_method: paymentMethod
        });
        const savedOrder = await this.orderRepository.save(order);
        for (const item of orderItems) {
            item.order = savedOrder;
            await this.orderItemRepository.save(item);
        }
        const orderList = savedOrder.orderItem.map(item => ` <p>Product: ${item.variant.product.name}</p>
            <p>Price: ${item.price}</p>
            <p>Color: ${item.color}</p>
            <p>Size: ${item.size}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Total_price: ${item.price * item.quantity}</p>`);
        const emailData = {
            email: checkUser.email,
            subject: 'Order Success',
            html: `<p> <b>Order detail<b></p>
                <p>quantity: ${savedOrder.quantity}</p>
                <p>total price: ${savedOrder.total_price}$</p>
                <p>payment method: ${savedOrder.payment_method}</p> 
                    <br>
                <p><b>Items:</b></p>
                ${orderList}`
        };
        await this.emailService.sendEmail(emailData);
        if (orderDto.payment_method === 2) {
            const updateUserPoint = checkUser.points - order.total_price;
            await this.userRepository.createQueryBuilder()
                .update(user_entity_1.User)
                .set({ points: updateUserPoint })
                .where("id = :id", { id: checkUser.id })
                .execute();
            return {
                "quantity": savedOrder.quantity,
                "total_price": savedOrder.total_price,
                "orderItem": savedOrder.orderItem.map(element => {
                    return {
                        "price": element.price,
                        "color": element.color,
                        "size": element.size,
                        "quantity": element.quantity,
                        "product": element.variant
                    };
                }),
                "id": savedOrder.id,
                "status": savedOrder.status,
                "payment_method": savedOrder.payment_method,
                "is_delete": savedOrder.is_delete,
                "order_date": savedOrder.createdAt
            };
        }
        const dataResult = await this.appotaPayService.createTransaction(String(savedOrder.id), orderDto.total_price);
        return {
            "quantity": savedOrder.quantity,
            "total_price": savedOrder.total_price,
            "orderItem": savedOrder.orderItem.map(element => {
                return {
                    "price": element.price,
                    "color": element.color,
                    "size": element.size,
                    "quantity": element.quantity,
                    "product": element.variant
                };
            }),
            "id": savedOrder.id,
            "status": savedOrder.status,
            "payment_method": savedOrder.payment_method,
            "is_delete": savedOrder.is_delete,
            "order_date": savedOrder.createdAt,
            "payment_url": dataResult.payment.url
        };
    }
    async deleteOrder(id) {
        const checkOrder = await this.orderRepository.findOne({ where: { id } });
        if (!checkOrder) {
            throw new common_1.HttpException("Product not found!", common_1.HttpStatus.NOT_FOUND);
        }
        return await this.orderRepository.createQueryBuilder()
            .update(order_entity_1.Order)
            .set({ is_delete: true })
            .where("id = :id", { id })
            .execute();
    }
    async getAllOrder(query) {
        const items_per_page = query.items_per_page || 10;
        const page = Number(query.page) || 1;
        const skip = (page - 1) * items_per_page;
        const [res, total] = await this.orderRepository.findAndCount({
            take: items_per_page,
            skip: skip,
            where: {
                is_delete: false
            },
            relations: ['orderItem']
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
    async getOneOrder(id) {
        return await this.orderRepository.findOne({
            where: { id },
            relations: ['orderItem', 'user', 'orderItem.variant', 'orderItem.variant.thumbnail', 'orderItem.variant.product'],
            select: {
                id: true,
                quantity: true,
                total_price: true,
                status: true,
                is_delete: true,
                createdAt: true,
                orderItem: {
                    id: true,
                    color: true,
                    size: true,
                    quantity: true,
                    variant: {
                        id: true,
                        SKU: true,
                        images: true,
                        thumbnail: {
                            id: true,
                            thumbnail: true
                        },
                        product: {
                            id: true,
                            name: true,
                            description: true,
                            user_gender: true,
                            is_delete: true
                        }
                    }
                },
                user: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true
                }
            }
        });
    }
    async getAllOrderHistory(id) {
        const checkUser = await this.userRepository.findOne({ where: { id } });
        if (!checkUser) {
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        }
        return await this.orderRepository.find({
            where: {
                user: { id },
                status: 'delivered'
            }
        });
    }
    async processingReturnedResult(orderId) {
        const checkOrder = await this.orderRepository.findOne({
            where: { id: orderId }
        });
        if (!checkOrder) {
            throw new common_1.HttpException("Order not found", common_1.HttpStatus.NOT_FOUND);
        }
        return await this.orderRepository.createQueryBuilder()
            .update(order_entity_1.Order)
            .set({ payment_status: true })
            .where("id = :id", { id: orderId })
            .execute();
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(orderItem_entity_1.OrderItem)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(variant_entity_1.Variant)),
    __param(6, (0, common_1.Inject)((0, common_1.forwardRef)(() => appota_pay_service_1.AppotaPayService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        producer_service_1.ProducerService,
        email_service_1.EmailService,
        appota_pay_service_1.AppotaPayService])
], OrderService);
//# sourceMappingURL=order.service.js.map