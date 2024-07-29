import { Order } from 'src/order/entities/order.entity';
import { Variant } from 'src/product/entities/variant.entity';
export declare class OrderItem {
    id: number;
    price: number;
    color: string;
    size: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    order?: Order;
    variant?: Variant;
}
