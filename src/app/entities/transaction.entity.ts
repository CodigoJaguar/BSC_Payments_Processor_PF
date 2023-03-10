// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Currency } from './currency.entity';
import { Wallet } from './wallet.entity';

@Entity()
export class Transaction extends BaseEntity {

  @PrimaryColumn({length:100})
  id: string;

  @Column({length:100 , nullable:false})
  walletId : string;

  @Column()
  date: Date;

  @Column()
  description: string;

  @Column({length:100})
  from: string;

  @Column({length:100})
  to: string;

  @Column({nullable:false})
  amount: string;

  @ManyToOne(()=>Currency, (currency)=>currency.transactions)
  currency:Currency

  @ManyToOne(()=>Wallet, wallet => wallet.transactions)
  wallet : Wallet;


}
