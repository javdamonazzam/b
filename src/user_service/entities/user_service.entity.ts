import { BaseEntity } from 'src/base/base.entity';
import { Service } from 'src/service/entities/service.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('user_service')
export class UserService extends BaseEntity {
  @Column('int')
  service_id: number;
  @Column('int')
  user_id: number;
  // @Column({ type: 'date' })
  // expire_time: Date;

  @ManyToOne('User', 'user_services')
  @JoinColumn({ name: 'user_id' })
  user: User;
  @OneToMany('Service', 'user_service')
  @JoinColumn({ name: 'service_id' })
  service: Service;
}
