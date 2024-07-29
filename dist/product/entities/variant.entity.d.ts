import { Product } from './product.entity';
import { Thumbnail } from './thumbnail.entity';
import { OrderItem } from 'src/order/entities/orderItem.entity';
import { Size } from 'src/size/entities/size.entity';
import { Color } from 'src/color/entities/color.entity';
export declare class Variant {
    id: number;
    SKU: string;
    images: string;
    price: number;
    stock_quantity: number;
    material: string;
    discount: number;
    createdAt: Date;
    updatedAt: Date;
    thumbnail?: Thumbnail[];
    orderItem?: OrderItem[];
    product?: Product;
    sizes: Size[];
    colors: Color[];
}
