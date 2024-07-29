import { Variant } from './variant.entity';
export declare class Thumbnail {
    id: number;
    thumbnail: string;
    createdAt: Date;
    updatedAt: Date;
    variant?: Variant;
}
