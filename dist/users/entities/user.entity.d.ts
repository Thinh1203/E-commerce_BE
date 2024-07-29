import { Order } from 'src/order/entities/order.entity';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    points: number;
    isActive: boolean;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    order?: Order[];
}
