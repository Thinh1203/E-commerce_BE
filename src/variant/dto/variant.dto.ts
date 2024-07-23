import { IsInt, IsNotEmpty, Min } from "class-validator";

export class VariantDto {
    @IsNotEmpty()
    SKU: string;

    @IsNotEmpty()
    price: number;

    @IsInt()
    @Min(0)
    stock_quantity: number;

    @IsNotEmpty()
    color: string;

    @IsNotEmpty()
    size: string;

    @IsNotEmpty()
    material: string;

    @IsInt()
    @Min(0)
    productId: number;
}