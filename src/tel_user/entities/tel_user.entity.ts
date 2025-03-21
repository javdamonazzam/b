import { Column } from 'typeorm';

export class TelUser {
  @Column({ type: 'varchar', length: 250 })
  chatId: string;
  @Column('text')
  server_info: string;
}
