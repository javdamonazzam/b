import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import moment from 'jalali-moment';

import { BaseCrudService, QueryParams } from 'src/base';
import { Service } from './entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServerService } from '@/server/server.service';
import { UserService } from '@/user/user.service';
import { WalletService } from '@/wallet/wallet.service';
import { ServiceType } from '@/types/enum/service_type';
import { Timeout } from '@nestjs/schedule';

@Injectable()
export class ServiceService extends BaseCrudService<Service> {
  constructor(
    @InjectRepository(Service)
    protected serviceRepository: Repository<Service>,
    private readonly serverService: ServerService,
    private readonly userService: UserService,
    private readonly walletService: WalletService,
  ) {
    super(serviceRepository);
  }

  async create_account(body: any) {
    console.log("start");
    
    function modifyConfig(config: any) {
      // Split the config into lines
      let lines = config.split('\n');

      // Find the index for each section
      let interfaceIndex = lines.findIndex((line) =>
        line.startsWith('[Interface]'),
      );
      let peerIndex = lines.findIndex((line) => line.startsWith('[Peer]'));

      // Add MTU
      let mtuLine = 'MTU = 1280';
      if (!lines.includes(mtuLine)) {
        lines.splice(interfaceIndex + 4, 0, mtuLine); // Insert after DNS line
      }

      let keepaliveLine = 'PersistentKeepalive = 21';
      if (!lines.includes(keepaliveLine)) {
        lines.splice(peerIndex + 4, 0, keepaliveLine); // Insert after Endpoint line
      }

      // Join the lines back into a single string
      return lines.join('\n');
    }
    function generateRandom8DigitNumber() {
      const min = 10000; // Minimum 8-digit number
      const max = 99999; // Maximum 8-digit number
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const serverinfo = await this.serverService.findOneBy({
      ip: body.ip,
    });
    console.log(2);
    
    // Usage example
    const rand = generateRandom8DigitNumber();
    
    const user = await this.userService.findOneById(body.id);
    
    const service_price = Math.floor(user.account_price * body.month);
    console.log(service_price);
    
    const wallet = await this.walletService.findOneBy({ user_id: user.id });
    console.log(wallet);
    
    if (wallet.wallet_balance < service_price)
      throw new NotFoundException('موجودی شما برای خرید تانل کافی نیست ');
    console.log(serverinfo);
    
    if (serverinfo) {
      const res = await axios.get(
        `http://${body.ip}:${serverinfo.port}/create?publicKey=${body.title + rand}`,
      );
      if (serverinfo.service_type == ServiceType.WIRE) {
        const config = res.data.replace(serverinfo.ip, serverinfo.damein);
        const newConfig = modifyConfig(config);
        await this.walletService.charge(user.id, -service_price);
        const service = {
          title: body.title + rand,
          user_id: user.id,
          server_id: serverinfo.id,
          service_type: serverinfo.service_type,
          month: body.month,
          server_info: newConfig,
          status: true,
        };
        return super.create(service);
      } else if (serverinfo.service_type == ServiceType.OPENVPN) {
        const config = res.data.replace(serverinfo.ip, serverinfo.damein);
        await this.walletService.charge(user.id, -service_price);
        const service = {
          title: body.title + rand,
          user_id: user.id,
          server_id: serverinfo.id,
          service_type: serverinfo.service_type,
          month: body.month,
          server_info: config,
          status: true,
        };
        return super.create(service);
      }
    } else {
      throw new NotFoundException('اطلاعات وارد شده درست نیست');
    }
  }
  async downloadPublic(query: QueryParams) {
    const results = await super.findAll({ filter: { title: query.title } });
    return results;
  }
  async DeleteService(id: number) {
    const service = await super.findOne(+id);
    const today = new Date();
    // اگر کاربر کمتر از سه روز استفاده کرده بود هزینه را برکردونیم
    const threeDaysLater = new Date(today);
    threeDaysLater.setDate(today.getDate() + 3);
    const serviceCreatedAt = new Date(service.createdAt);

    const threeDaysAfterServiceCreated = new Date(serviceCreatedAt);
    threeDaysAfterServiceCreated.setDate(serviceCreatedAt.getDate() + 3);
    if (today < threeDaysAfterServiceCreated) {
      const user = await this.userService.findOneById(service.user_id);
      await this.walletService.charge(
        service.user_id,
        Math.floor(user.account_price * service.month),
      );
    }
    const serverinfo = await this.serverService.findOne(service.server_id);
    if (serverinfo) {
      try {
        const res = await axios.get(
          `http://${serverinfo.ip}:${serverinfo.port}/remove?publicKey=${service.title}`,
        );
        return await super.softDelete(id);
      } catch {
        throw new NotFoundException(
          'حذف با موفقیت انجام نشد دوباره تلاش کنین ',
        );
      }
    }
  }
  async Delete_expir_Service() {
    const services = await super.findAll({});
    for (let index = 0; index < services.result.length; index++) {
      const service = services.result[index];

      // const jalaliDate = moment(service.createdAt, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD');
      const date = new Date(service.createdAt);
      const timestamp = Math.floor(date.getTime() / 1000);
      const daysecend = Math.floor(service.month * 30 * 86400);
      const today = new Date();
      const todaytimestamp = Math.floor(today.getTime() / 1000);
      const endDate = Math.round(
        (timestamp + daysecend - todaytimestamp) / 86400,
      );

      if (endDate<-10) {
        const serverinfo = await this.serverService.findOneBy({
          id: service.server_id,
        });
        
        try {
          const res = await axios.get(
            `http://${serverinfo.ip}:${serverinfo.port}/remove?publicKey=${service.title}`,
          );
          Timeout(1000)
          return await super.softDelete(service.id);
        } catch {
          throw new NotFoundException(
            'حذف با موفقیت انجام نشد دوباره تلاش کنین ',
          );
        }
      
      }
    }
  }
  async updateDate(id) {
    const service = await super.findOne(id);
    const user = await this.userService.findOne(service.user_id);
    await this.walletService.charge(user.id, -user.account_price);
    return await super.update(id, { month: service.month + 1 });
  }
}
