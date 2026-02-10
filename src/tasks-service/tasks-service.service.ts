import { ServiceService } from '@/service/service.service';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { ServerService } from '@/server/server.service';
import axios from 'axios';
@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    private readonly serviceService: ServiceService,
    private readonly serverService: ServerService,
  ) { }
  @Cron('0 */3 * * * *', {
    timeZone: 'Asia/Tehran',
  })
  async handleCron() {
    this.logger.debug('Called when the second is 45');
    const services = await this.serviceService.findAll({});
    for (let index = 0; index < services.result.length; index++) {
      const service = services.result[index];
      const date = new Date(service.createdAt);
      const timestamp = Math.floor(date.getTime() / 1000);
      const daysecend = Math.floor(service.month * 30 * 86400);
      const today = new Date();
      const todaytimestamp = Math.floor(today.getTime() / 1000);
      const endDate = Math.round(
        (timestamp + daysecend - todaytimestamp) / 86400,
      );

      if (endDate < 1) {
        console.log(service);

        const serverinfo = await this.serverService.findOneBy({
          id: service.server_id,
        });
        console.log(serverinfo);


        if (service.service_type == "WIRE") {
          console.log(`http://${serverinfo.ip}:8000/vpn/deactivate?publicKey=${service.title}`);

          axios.get(`http://${serverinfo.ip}:8000/vpn/deactivate?publicKey=${service.title}`)
          return await this.serviceService.update(serverinfo.id, { status: false });

        } else {
          console.log(`http://${serverinfo.ip}:8000/vpn/deactivate?publicKey=${service.title}`);

          axios.get(`http://${serverinfo.ip}:9000/vpn/deactivate?publicKey=${service.title}`)
          console.log("Off ", serverinfo.title);

          return await this.serviceService.update(serverinfo.id, { status: false });

        }

      }
      if (endDate < -5) {

        const serverinfo = await this.serverService.findOneBy({
          id: service.server_id,
        });

        try {
          const res = await axios.get(
            `http://${serverinfo.ip}:${serverinfo.port}/remove?publicKey=${service.title}`,
          );
          Timeout(2000)
          await this.serviceService.softDelete(service.id);
        } catch {
          throw new NotFoundException(
            'حذف با موفقیت انجام نشد دوباره تلاش کنین ',
          );
        }
      }
    }
  }
}
