import {
    Column,
} from 'typeorm';
export class User {
    @Column({ type: 'varchar', length: 250 })
    username: string;
    @Column({ type: 'varchar', length: 250, nullable: true })
    password: string;

}
