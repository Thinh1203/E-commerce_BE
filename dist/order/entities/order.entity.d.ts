import { User } from 'src/users/entities/user.entity';
import { OrderItem } from './orderItem.entity';
export declare class Order {
    id: number;
    quantity: number;
    total_price: number;
    status: string;
    payment_method: string;
    payment_status: boolean;
    is_delete: boolean;
    createdAt: Date;
    updatedAt: Date;
    user?: User;
    orderItem?: OrderItem[];
}
