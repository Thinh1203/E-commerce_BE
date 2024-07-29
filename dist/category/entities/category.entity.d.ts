import { Product } from 'src/product/entities/product.entity';
export declare class Category {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    product?: Product[];
}
