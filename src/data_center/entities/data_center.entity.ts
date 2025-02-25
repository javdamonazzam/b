import { BaseEntity } from 'src/base/base.entity';
import { Server } from 'src/server/entities/server.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('data_center')
export class DataCenter extends BaseEntity {
  @Column({ type: 'varchar', length: 250 })
  title: string;
  @Column({ type: 'varchar', length: 250 })
  website: string;
  @Column({ type: 'varchar', length: 250 })
  username: string;
  @Column({ type: 'varchar', length: 250 })
  password: string;
  // Relation
  @OneToMany('Server', 'data_center')
  servers: Server[];
}
// entity service
// @ManyToOne('ServiceType', 'services')
// @JoinColumn({ name: 'service_type_id' })
// service_type: ServiceType;
// entity service type
// @OneToMany('Service', 'service_type')
// services: Service[];
