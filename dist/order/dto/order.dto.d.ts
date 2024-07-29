declare class ProductVariantDto {
    quantity: number;
    price: number;
    variantId: number;
}
export declare class OrderDto {
    quantity: number;
    total_price: number;
    payment_method: number;
    orderData: ProductVariantDto[];
}
export {};
