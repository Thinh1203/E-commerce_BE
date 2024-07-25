import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/orderItem.entity';
import { User } from 'src/users/entities/user.entity';
import { Variant } from 'src/product/entities/variant.entity';
import { OrderFilterDto } from './dto/order-filter.dto';
import { EmailService } from 'src/email/email.service';
import { ProducerService } from 'src/queue/producer.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private orderItemRepository: Repository<OrderItem>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Variant)
        private variantRepository: Repository<Variant>,
        private emailService: EmailService,
        private producerService: ProducerService
    ){}
    
    async addOrder (orderDto: OrderDto, userId: number) {
        const checkUser = await this.userRepository.findOne({where:{id: userId}});
        if(!checkUser) {
            throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
        }
        
        if(checkUser.points < orderDto.total_price) {
            throw new HttpException("The customer does not have enough points to pay", HttpStatus.BAD_REQUEST);
        }

        const orderItems: OrderItem[] = [];
        
        for(const element of orderDto.orderData) {
            const checkProductVariant = await this.variantRepository.findOne({
                where: {
                    id: Number(element.variantId)
                },
                relations: ['colors', 'sizes', 'product']
            }); 

     
            if (!checkProductVariant) { 
                throw new HttpException("Product not found!", HttpStatus.NOT_FOUND);
            }
            if (element.quantity > checkProductVariant.stock_quantity) {
                throw new HttpException("The quantity of products in stock is not enough", HttpStatus.BAD_REQUEST);
            }
            const orderItemData = new OrderItem();
            orderItemData.variant = checkProductVariant;
            orderItemData.price = element.price;
            orderItemData.quantity = element.quantity;

            const color = checkProductVariant.colors[0];
            const size = checkProductVariant.sizes[0];


            if (color) {
                orderItemData.color = color.name;
            } else {
                throw new HttpException("Color not found!", HttpStatus.NOT_FOUND);
            }

            if (size) {
                orderItemData.size = size.name;
            } else {
                throw new HttpException("Size not found!", HttpStatus.NOT_FOUND);
            }

            orderItems.push(orderItemData);
            checkProductVariant.stock_quantity -= element.quantity;
            await this.variantRepository.save(checkProductVariant);
        }

        const order = this.orderRepository.create({
            user: checkUser,
            quantity : orderDto.quantity,
            total_price : orderDto.total_price,
            orderItem: orderItems
        });
        const savedOrder = await this.orderRepository.save(order); 

        for (const item of orderItems) {
            item.order = savedOrder;    
            await this.orderItemRepository.save(item);
        }

        const updateUserPoint = checkUser.points - order.total_price;
        await this.userRepository.createQueryBuilder()
            .update(User)
            .set({points: updateUserPoint})
            .where("id = :id", {id: checkUser.id})
            .execute();
        
        const orderList = savedOrder.orderItem.map(item => 
            ` <p>Product: ${item.variant.product.name}</p>
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
                <p>total priceL: ${savedOrder.total_price}$</p>
                    <br>
                <p><b>Items:</b></p>
                ${orderList}`
        }
        // await this.producerService.addToEmailQueue(emailData);
        const mail = await this.emailService.sendEmail(emailData);

        return {
            "quantity": savedOrder.quantity,
            "total_price": savedOrder.total_price,
            "orderItem" : savedOrder.orderItem.map(element => {
                return {
                    "price": element.price,
                    "color": element.color,
                    "size": element.size,
                    "quantity": element.quantity,
                    "product": element.variant
                }
            }),
            "id": savedOrder.id,
            "status": savedOrder.status,
            "is_delete": savedOrder.is_delete,
            "order_date": savedOrder.createdAt
        };
    }

    async deleteOrder (id: number) {
        const checkOrder = await this.orderRepository.findOne({where:{id}});
        if(!checkOrder) {
            throw new HttpException("Product not found!", HttpStatus.NOT_FOUND);
        }
        return await this.orderRepository.createQueryBuilder()
        .update(Order)
        .set({ is_delete: true })
        .where("id = :id", {id})
        .execute();
    }

    async getAllOrder (query: OrderFilterDto) {
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
        const last_page = Math.ceil(total/items_per_page);
        const prev_page = page - 1 < 1 ? null : page - 1;
        const next_page = page + 1 > last_page ? null : page + 1;
        return {
            total,
            data: res,
            prev_page,
            next_page,
            last_page
        }
    }

    async getOneOrder (id: number) {
        return await this.orderRepository.findOne({
            where: {id},
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
        })
    }

    async getAllOrderHistory (id: number) {

        const checkUser = await this.userRepository.findOne({where:{id}});
        if(!checkUser) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        return await this.orderRepository.find({
            where: {
                user: {id},
                status: 'delivered'
            }
        })
    }
}
