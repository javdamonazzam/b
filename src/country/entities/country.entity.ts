import { BaseEntity } from 'src/base/base.entity';
import { Server } from 'src/server/entities/server.entity';
import { Column, Entity, OneToMany } from 'typeorm';
@Entity('country')
export class Country extends BaseEntity {
  @Column({ type: 'varchar', length: 250 })
  title: string;
  @Column({ type: 'varchar', length: 250 })
  name: string;
  @Column({ type: 'varchar', length: 250 })
  city: string;
  @Column({ type: 'varchar', length: 250 })
  code: string;
  @Column('boolean')
  status: boolean;
  // @OneToMany('Server', 'country')
  // servers: Server[];
}
