import { ServiceType } from '@/types/enum/service_type';
import { User } from '@/user/entities/user.entity';
import { BaseEntity } from 'src/base/base.entity';
import { Service } from 'src/service/entities/service.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

@Entity('server')
export class Server extends BaseEntity {
  @Column({ type: 'varchar', length: 250 })
  title: string;
  
  @Column({ type: 'varchar', length: 250 })
  ip: string;

  @Column({ type: 'varchar', length: 250 })
  damein: string;

  @Column('int')
  port: number;

  @Column('enum', { enum: ServiceType, default: ServiceType.WIRE }   )
  service_type: ServiceType;
  
  @Column('int')
  max_user: number;

  // @OneToMany('Service', 'server')
  // services: Service[];
  
  @ManyToMany(() => User, user => user.servers)
  users: User[];
}

