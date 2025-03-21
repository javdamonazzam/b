import { BaseEntity } from 'src/base/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('wallet')
export class Wallet extends BaseEntity {
  @Column('int')
  wallet_balance: number;
  @Column('int')
  user_id: number;
  @OneToOne('User', 'wallet')
  @JoinColumn({ name: 'user_id' })
  user: User;
}
