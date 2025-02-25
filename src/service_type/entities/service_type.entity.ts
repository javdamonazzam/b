import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { IpType } from '../../types/enum/ip-type.enum';
import { Service } from 'src/service/entities/service.entity';

@Entity('service_type')
export class ServiceType extends BaseEntity {
  @Column({ type: 'varchar', length: 250 })
  title: string;
  @Column({ type: 'varchar', length: 250 })
  slug: string;
  @Column('enum', { enum: IpType, default: IpType.STATIC })
  ip_type: IpType;
  @Column('int')
  volum: number;
  @Column('int')
  price: number;
  @Column('int')
  time: number;
  @OneToMany('Service', 'service_type')
  services: Service[];
}
