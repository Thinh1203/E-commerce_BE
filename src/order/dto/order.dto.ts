import { IsArray, IsInt, IsNotEmpty, Min } from "class-validator";

class ProductVariantDto {
    @IsInt()
    @Min(1)
    quantity: number;

    @IsNotEmpty()
    @Min(1)
    price: number;

    @IsInt()
    @Min(1)
    variantId: number[];
}
export class OrderDto {
    @IsInt()
    @Min(1)
    quantity: number;
    
    @IsNotEmpty()
    total_price: number;

    @IsArray()
    @IsNotEmpty()
    orderData: ProductVariantDto[];
}