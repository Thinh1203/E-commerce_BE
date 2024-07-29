import { OrderDto } from './dto/order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/orderItem.entity';
import { User } from 'src/users/entities/user.entity';
import { Variant } from 'src/product/entities/variant.entity';
import { OrderFilterDto } from './dto/order-filter.dto';
import { EmailService } from 'src/email/email.service';
import { AppotaPayService } from 'src/appota-pay/appota-pay.service';
export declare class OrderService {
    private orderRepository;
    private orderItemRepository;
    private userRepository;
    private variantRepository;
    private emailService;
    private appotaPayService;
    constructor(orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>, userRepository: Repository<User>, variantRepository: Repository<Variant>, emailService: EmailService, appotaPayService: AppotaPayService);
    addOrder(orderDto: OrderDto, userId: number): Promise<{
        quantity: number;
        total_price: number;
        orderItem: {
            price: number;
            color: string;
            size: string;
            quantity: number;
            product: Variant;
        }[];
        id: number;
        status: string;
        payment_method: string;
        is_delete: boolean;
        order_date: Date;
        payment_url?: undefined;
    } | {
        quantity: number;
        total_price: number;
        orderItem: {
            price: number;
            color: string;
            size: string;
            quantity: number;
            product: Variant;
        }[];
        id: number;
        status: string;
        payment_method: string;
        is_delete: boolean;
        order_date: Date;
        payment_url: any;
    }>;
    deleteOrder(id: number): Promise<import("typeorm").UpdateResult>;
    getAllOrder(query: OrderFilterDto): Promise<{
        total: number;
        data: Order[];
        prev_page: number;
        next_page: number;
        last_page: number;
    }>;
    getOneOrder(id: number): Promise<Order>;
    getAllOrderHistory(id: number): Promise<Order[]>;
    processingReturnedResult(orderId: number): Promise<import("typeorm").UpdateResult>;
}
