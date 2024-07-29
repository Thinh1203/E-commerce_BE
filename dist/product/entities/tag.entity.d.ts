import { Product } from './product.entity';
export declare class Tag {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    products: Product[];
}
