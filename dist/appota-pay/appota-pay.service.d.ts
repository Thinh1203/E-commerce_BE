import { HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OrderService } from 'src/order/order.service';
export declare class AppotaPayService {
    private readonly configService;
    private readonly jwtService;
    private orderService;
    private apiKey;
    private secretKey;
    private partnerKey;
    constructor(configService: ConfigService, jwtService: JwtService, orderService: OrderService);
    private createJWT;
    private ksort;
    private createSignature;
    createTransaction(orderId: string, amount: number): Promise<any>;
    processingReturnedResult(data: string, signature: string): Promise<import("typeorm").UpdateResult | {
        status: HttpStatus;
        message: string;
    } | {
        message: string;
        status?: undefined;
    }>;
}
