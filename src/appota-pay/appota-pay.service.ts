import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AppotaPayService {
  private readonly apiKey: string;
  private readonly secretKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('APPOTAPAY_API_KEY');
    this.secretKey = this.configService.get<string>('APPOTAPAY_API_SecretKey');
  }

  async createTransaction(data: any): Promise<any> {
    const url = 'https://sandbox.appotapay.com/v1/transactions'; 
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };

    const payload = {
      secret_key: this.secretKey,
      ...data,
    };

    try {
      const response = await axios.post(url, payload, { headers });
      console.log(response);
      
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }


}

