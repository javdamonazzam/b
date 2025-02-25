import { BaseEntity } from 'src/base/base.entity';

import { Column, Entity } from 'typeorm';

@Entity()
export class DiscountCode extends BaseEntity {
  @Column({ type: 'varchar', length: 250 })
  title: string;
  @Column('int')
  service_id: number;
  @Column('int')
  percent: number;
}
