import { BaseEntity } from 'src/base/base.entity';
import { Service } from 'src/service/entities/service.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('service_info')
export class ServiceInfo extends BaseEntity {
  @Column('int')
  volum: number;
  @Column('int')
  price: number;
  @Column('int')
  time: number;
  @OneToMany('Service', 'service_info')
  services: Service[];
}
