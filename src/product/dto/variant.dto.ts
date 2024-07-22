import { IsNotEmpty } from "class-validator";

export class VariantDto {
    @IsNotEmpty()
    SKU: string;
    
    @IsNotEmpty()
    images: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    stock_quantity: number;

    @IsNotEmpty()
    color: string;

    @IsNotEmpty()
    size: string;

    @IsNotEmpty()
    material: string;

    @IsNotEmpty()
    productId: number;
}