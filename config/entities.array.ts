import { Country } from 'src/country/entities/country.entity';
import { DataCenter } from 'src/data_center/entities/data_center.entity';
import { DiscountCode } from 'src/discount_code/entities/discount_code.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Server } from 'src/server/entities/server.entity';
import { Service } from 'src/service/entities/service.entity';
import { ServiceInfo } from 'src/service_info/entities/service_info.entity';
import { ServiceType } from 'src/service_type/entities/service_type.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user_service/entities/user_service.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';

export const TypeORMRepositoriesArray = [
  User,
  DiscountCode,
  Country,
  DataCenter,
  Server,
  UserService,
  ServiceInfo,
  ServiceType,
  DiscountCode,
  Wallet,
  Invoice,
  Service,
];
