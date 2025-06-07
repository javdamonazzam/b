import { Body, Injectable } from '@nestjs/common';
import { CreateZarinpalDto } from './dto/create-zarinpal.dto';
import { UpdateZarinpalDto } from './dto/update-zarinpal.dto';
import ZarinPal from 'zarinpal-node-sdk';
import { log } from 'node:console';
import axios from 'axios';


@Injectable()
export class ZarinpalService {
  async initiatePayment(body: CreateZarinpalDto) {
    try {

      const response = await axios.post(
        'https://payment.zarinpal.com/pg/v4/payment/request.json',
        {
          merchant_id: '1c0a57be-5735-486a-b64e-3104e6bc9afe',
          amount: 200000,
          callback_url: 'http://localhost:3031/payment/',
          description: 'Transaction description.',
          metadata: {
            mobile: '09121234567',
            email: 'info.test@example.com',
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      const result = response.data;
      console.log(result.data.code);

      if (result.data.code === 100) {
        const authority = result.data.authority;
        const redirectUrl = `https://payment.zarinpal.com/pg/StartPay/${authority}`;
        console.log(redirectUrl);

        return redirectUrl
      }
    } catch (error) {
    }

  }

  async verifyPayment(body: any) {
    const payload = {
      merchant_id: '1c0a57be-5735-486a-b64e-3104e6bc9afe', 
      amount: 200000,
      authority: "A000000000000000000000000000gero2qno"
    };
console.log("start");

    try {
      const response = await axios.post(
        'https://payment.zarinpal.com/pg/v4/payment/verify.json',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error('Verification error:', error?.response?.data || error.message);
      throw error;
    }
  }


  findOne(id: number) {

    return `This action returns a #${id} zarinpal`;
  }

  update(id: number, updateZarinpalDto: UpdateZarinpalDto) {
    return `This action updates a #${id} zarinpal`;
  }

  remove(id: number) {
    return `This action removes a #${id} zarinpal`;
  }
}
