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
    colorId: number;

    @IsNotEmpty()
    sizeId: number;

    @IsNotEmpty()
    material: string;

    @IsInt()
    @Min(0)
    productId: number;
}