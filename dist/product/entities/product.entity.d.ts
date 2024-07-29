import { Variant } from './variant.entity';
import { Tag } from './tag.entity';
import { Category } from 'src/category/entities/category.entity';
export declare class Product {
    id: number;
    name: string;
    description: string;
    user_gender: string;
    is_delete: boolean;
    createdAt: Date;
    updatedAt: Date;
    variant?: Variant[];
    category?: Category;
    tags: Tag[];
}
