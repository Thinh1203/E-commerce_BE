import { Controller, Post, Body } from '@nestjs/common';
import { AppotaPayService } from './appota-pay.service';


@Controller('appotapay')
export class AppotaPayController {
  constructor(private readonly appotaPayService: AppotaPayService) {}

  @Post('create-transaction')
  async createTransaction(@Body() createTransactionDto: any) {
    return this.appotaPayService.createTransaction(createTransactionDto);
  }
}