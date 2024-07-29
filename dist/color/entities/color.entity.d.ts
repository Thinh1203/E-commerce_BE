import { Variant } from 'src/product/entities/variant.entity';
export declare class Color {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    variants: Variant[];
}
