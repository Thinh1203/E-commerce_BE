export declare class CreateTransactionDto {
    orderId: string;
    orderInfo: string;
    amount: number;
    bankCode: string;
    paymentMethod: string;
    notifyUrl: string;
    redirectUrl: string;
    action: string;
    extraData: string;
    currency: string;
    signature: string;
}
