import { ServiceType } from '@/types/enum/service_type';
import { User } from '@/user/entities/user.entity';
import { BaseEntity } from 'src/base/base.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Server } from 'src/server/entities/server.entity';
import { ServiceInfo } from 'src/service_info/entities/service_info.entity';
// import { ServiceType } from 'src/service_type/entities/service_type.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('service')
export class Service extends BaseEntity {
  @Column('varchar')
  title: string;
  @Column('int')
  user_id: number;
  @Column('int')
  server_id: number;
  @Column('enum', { enum: ServiceType, default: ServiceType.WIRE })
  service_type: ServiceType;
  @Column('int')
  month: number;

  @Column('text')
  server_info: string;
  @Column({ type: 'boolean' })
  status: boolean;
  // relation
  @ManyToOne('User', 'service')
  @JoinColumn({ name: 'user_id' })
  users: User;

  // @ManyToOne('User', 'service')
  // @JoinColumn({ name: 'server_id' })
  // servers: Server;
  // @ManyToOne('ServiceType', 'services')
  // @JoinColumn({ name: 'service_type_id' })
  // service_type: ServiceType;

  // @ManyToOne('Server', 'services')
  // @JoinColumn({ name: 'server_id' })
  // server: Server[];

  // @ManyToOne('ServiceInfo', 'services')
  // @JoinColumn({ name: 'service_info_id' })
  // service_info: ServiceInfo[];

  // @OneToMany('Invoice', 'services')
  // invoice: Invoice[];
}
