import { Column } from "typeorm";

export class Zarinpal {
      @Column('int')
      month: number;
      @Column('int')
      price:number;
}
