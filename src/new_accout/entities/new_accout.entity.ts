import { BaseEntity } from '@/base';
import { User } from '@/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
@Entity('account')
export class NewAccout extends BaseEntity {
  @Column('int')
  user_id: number;
  @Column({ type: 'varchar', length: 250 })
  title: string;
  @Column('int')
  month:number
  @Column({ type: 'varchar', length: 250 })
  description:string;
  @ManyToOne('User', 'account')
  @JoinColumn({ name: 'user_id' })
  users: User;
}
