import { BaseEntity } from 'src/base/base.entity';
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { RoleEnum } from 'src/types/enum/role.enum';
import { Service } from '@/service/entities/service.entity';
import { Invoice } from '@/invoice/entities/invoice.entity';
import { Server } from '@/server/entities/server.entity';
@Entity('user')
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 250 })
  username: string;
  @Column({ type: 'varchar', length: 250, nullable: true })
  password: string;

  @Column('int')
  account_price: number;
  
  @Column('enum', { enum: RoleEnum, default: RoleEnum.USER })
  role: RoleEnum[];

  @BeforeInsert()
  async hashPasswordAndSetTimeStamp() {
    if(!this.password) return
    this.password = await bcrypt.hash(this.password, 10);
  }
  // relation
  @OneToMany('Service', 'user')
  service: Service[];

  @OneToMany('Invoice', 'user')
  invoice: Invoice[];

  @ManyToMany(() => Server, server => server.users)
  @JoinTable()
  servers: Server[];
}
// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { ROLES_KEY } from '../decorators/role.decorator';
// // import { UserInfoType } from 'src/auth/types/user-info.type';
// import { isPublic } from 'src/auth/utils/auth-utils';
// import { User } from 'src/user/entities/user.entity';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const request = context.switchToHttp().getRequest();
//     const requiredRoles: string[] = this.reflector.getAllAndOverride(
//       ROLES_KEY,
//       [context.getHandler(), context.getClass()],
//     );

//     if (!requiredRoles || isPublic(context, this.reflector)) {
//       return true;
//     }
//     const user: User = request.user;

//     return requiredRoles.some((role) => +role === user.role);
//   }
// }
