import { Wallet } from '@/wallet/entities/wallet.entity';
import { BaseEntity } from 'src/base/base.entity';
import { Server } from 'src/server/entities/server.entity';
import { Service } from 'src/service/entities/service.entity';
import { FactorStatusEnum } from 'src/types/enum/factor.enum';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
@Entity('invoice')
export class Invoice extends BaseEntity {
  @Column('int')
  user_id: number;
  @Column('int')
  price:number;
  @Column('enum', { enum: FactorStatusEnum, default: FactorStatusEnum.PAID })
  status: FactorStatusEnum;

  @ManyToOne('User', 'invoice')
  @JoinColumn({ name: 'user_id' })
  users: User;

}
