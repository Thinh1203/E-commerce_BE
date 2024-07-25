import { Module } from '@nestjs/common';
import { AppotaPayService } from './appota-pay.service';
import { ConfigModule } from '@nestjs/config';
import { AppotaPayController } from './appota-pay.controller';

@Module({
  imports:[
    ConfigModule.forRoot()
  ],
  controllers: [AppotaPayController],
  providers: [AppotaPayService],
  exports: [AppotaPayService]
})
export class AppotaPayModule {}
