import { AppotaPayService } from './appota-pay.service';
import { Response } from 'express';
export declare class AppotaPayController {
    private readonly appotaPayService;
    constructor(appotaPayService: AppotaPayService);
    paymentResult(data: string, signature: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
