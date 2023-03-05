import { dependency } from "@foal/core";
import { Wallets } from "./wallets.service";
import { Currency, Wallet} from "../entities";
import { Transaction } from '../entities/transaction.entity'
import { IBscTransactions } from "./bsc-scan-transactions.interface";
import { BigNumber } from 'bignumber.js';
import { getConnection, QueryRunner , DataSource} from "typeorm";



export class Transactions {
    @dependency
    private wallets:Wallets

   async processTransactions(apiTransactions: IBscTransactions[]){
        const currencies = await Currency.find();
        

        for(const apiTransaction of apiTransactions){ 
            
            const transactionId = `rv-${apiTransaction.hash}`;
            const exists = await Transaction.findOne( {where :{ id: transactionId}});

            if(!exists){
                const currency = currencies.find(m => m.contract.toLowerCase()==apiTransaction.contractAddress)
                
                if(currency){
                    await this.saveTransactionAndUpdateWalletBalance(transactionId,apiTransaction,currency)
                    console.log('savedTransactionAndIpdatedWallet')
                }

            }else{
                console.log(`Transaction already exists: `, { transactionId })
            }
        }
        
    }


    private async  saveTransactionAndUpdateWalletBalance(transactionId:string , apiTransaction: IBscTransactions, currency: Currency){
        const wallet = await this.getOrCreateWallet(apiTransaction.from);
        
        const AppDataSource = new DataSource({
            // type: "better-sqlite3",
            // database: "./db.sqlite3", 
            // entities: [Currency,Transaction,Wallet],
            // synchronize: true,
            // logging: true,
            // subscribers: [],
            // migrations:[]
            // type: 'postgres',
            // url:'postgres://cankvfix:KB4cnm-mIFHfmYPFeyKtPXxq4NZ9J3EE@mahmud.db.elephantsql.com/cankvfix',
            // host: 'mahmud.db.elephantsql.com',
            // port : 5432,
            // username: 'cankvfix',
            // password: 'KB4cnm-mIFHfmYPFeyKtPXxq4NZ9J3EE',
            // database: 'cankvfix',
            // synchronize: true,
            // logging: true,
            //---------------------------------
            type: 'postgres',
    url:'postgres://cankvfix:KB4cnm-mIFHfmYPFeyKtPXxq4NZ9J3EE@mahmud.db.elephantsql.com/cankvfix',
    host: 'mahmud.db.elephantsql.com',
    port : 5432,
    username: 'cankvfix',
    password: 'KB4cnm-mIFHfmYPFeyKtPXxq4NZ9J3EE',
    database: 'cankvfix',
    entities: [Currency,Transaction,Wallet],
    synchronize: true,
    logging: true,
    subscribers: [],
    migrations:['build/migrations/*.js']
           
            
        })
        
        const dataSource = await AppDataSource.initialize()
        
        
        const queryRunner = dataSource.createQueryRunner();
        
        await queryRunner.connect();
        
        await queryRunner.startTransaction();
        
        try {
            
            const transaction = this.createTransactionsEntity(queryRunner,transactionId,apiTransaction,currency,wallet)
            
            queryRunner.manager.createQueryBuilder()
            .update(Wallet)
            .set({balance: ()=> `balance + ${transaction.amount}`})
            //.set({balance: ()=> transaction.amount})
            .where({id : wallet.id})
            .execute();
            console.log(`Wallet saved ,` ,wallet.id)

            await queryRunner.manager.save(transaction);
            console.log(`Transaction saved`,transaction.id);

            // wallet.balance += transaction.amount;

            // await wallet.save();
            // await transaction.save();

            // console.log('Wallet saved, ' ,wallet.id)
            // console.log(`Transaction saved:`, transaction)

            await queryRunner.commitTransaction();
        } catch (error) {
            console.log('Rollback!')
            await queryRunner.rollbackTransaction();
            throw error;
        }finally{
            await queryRunner.release();
        }

        // const transaction = this.createTransactionsEntity(transactionId,apiTransaction,currency,wallet)
        // wallet.balance += transaction.amount;

        // await wallet.save();
        // await transaction.save();

        // console.log('Wallet saved, ' ,wallet.id)
        // console.log(`Transaction saved:`, transaction)
        
      
    }

    private async getOrCreateWallet(id:string){
        let wallet = await this.wallets.findWallet(id);

        if(!wallet){
            wallet= Wallet.create({id, balance : 0})
            await wallet.save();
        }
        return wallet
    }

    private createTransactionsEntity(queryRunner: QueryRunner, id:string , apiTransaction:IBscTransactions, currency:Currency, wallet: Wallet){
        
        const transaction = queryRunner.manager.create<Transaction>(Transaction);
        
        //const transaction = Transaction.create();
        //transaction.id = `rv-${apiTransaction.hash}`;
        transaction.id = id;
        transaction.date = new Date(parseInt(apiTransaction.timeStamp)*1000);
        transaction.description = "";
        transaction.from = apiTransaction.from;
        transaction.to = apiTransaction.to;
        transaction.currency = currency;
        transaction.wallet = wallet;
        

        const amount = new BigNumber(apiTransaction.value).div(new BigNumber(10).pow(currency.decimals))
        transaction.amount = amount.toNumber().toString();
        console.log('esto es amount:  --->',transaction.amount)

        return transaction
    }

}
