"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactions = void 0;
const core_1 = require("@foal/core");
const wallets_service_1 = require("./wallets.service");
const entities_1 = require("../entities");
const transaction_entity_1 = require("../entities/transaction.entity");
const bignumber_js_1 = require("bignumber.js");
const typeorm_1 = require("typeorm");
class Transactions {
    async processTransactions(apiTransactions) {
        const currencies = await entities_1.Currency.find();
        for (const apiTransaction of apiTransactions) {
            const transactionId = `rv-${apiTransaction.hash}`;
            const exists = await transaction_entity_1.Transaction.findOne({ where: { id: transactionId } });
            if (!exists) {
                const currency = currencies.find(m => m.contract.toLowerCase() == apiTransaction.contractAddress);
                if (currency) {
                    await this.saveTransactionAndUpdateWalletBalance(transactionId, apiTransaction, currency);
                    console.log('savedTransactionAndIpdatedWallet');
                }
            }
            else {
                console.log(`Transaction already exists: `, { transactionId });
            }
        }
    }
    async saveTransactionAndUpdateWalletBalance(transactionId, apiTransaction, currency) {
        const wallet = await this.getOrCreateWallet(apiTransaction.from);
        const AppDataSource = new typeorm_1.DataSource({
            // type: "better-sqlite3",
            // database: "./db.sqlite3", 
            // entities: [Currency,Transaction,Wallet],
            // synchronize: true,
            // logging: true,
            // subscribers: [],
            // migrations:[]
            type: 'postgres',
            url: 'postgres://cankvfix:KB4cnm-mIFHfmYPFeyKtPXxq4NZ9J3EE@mahmud.db.elephantsql.com/cankvfix',
            host: 'mahmud.db.elephantsql.com',
            port: 5432,
            username: 'cankvfix',
            password: 'KB4cnm-mIFHfmYPFeyKtPXxq4NZ9J3EE',
            database: 'cankvfix',
            synchronize: true,
            logging: true,
        });
        const dataSource = await AppDataSource.initialize();
        const queryRunner = dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        console.log('Started query runner:');
        try {
            console.log('Try started:', queryRunner);
            const transaction = this.createTransactionsEntity(queryRunner, transactionId, apiTransaction, currency, wallet);
            console.log('CreateEntity check');
            queryRunner.manager.createQueryBuilder()
                .update(entities_1.Wallet)
                .set({ balance: () => `balance + ${transaction.amount}` })
                .where({ id: wallet.id })
                .execute();
            console.log(`Wallet saved ,`, wallet.id);
            await queryRunner.manager.save(transaction);
            console.log(`Transaction saved`, transaction.id);
            // wallet.balance += transaction.amount;
            // await wallet.save();
            // await transaction.save();
            // console.log('Wallet saved, ' ,wallet.id)
            // console.log(`Transaction saved:`, transaction)
            await queryRunner.commitTransaction();
        }
        catch (error) {
            console.log('Rollback!');
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
        // const transaction = this.createTransactionsEntity(transactionId,apiTransaction,currency,wallet)
        // wallet.balance += transaction.amount;
        // await wallet.save();
        // await transaction.save();
        // console.log('Wallet saved, ' ,wallet.id)
        // console.log(`Transaction saved:`, transaction)
    }
    async getOrCreateWallet(id) {
        let wallet = await this.wallets.findWallet(id);
        if (!wallet) {
            wallet = entities_1.Wallet.create({ id, balance: 0 });
            await wallet.save();
        }
        return wallet;
    }
    createTransactionsEntity(queryRunner, id, apiTransaction, currency, wallet) {
        console.log('CreateEntity check enter function');
        const transaction = queryRunner.manager.create(transaction_entity_1.Transaction);
        console.log('CreateEntity check do transaction:', transaction);
        //const transaction = Transaction.create();
        //transaction.id = `rv-${apiTransaction.hash}`;
        transaction.id = id;
        transaction.date = new Date(parseInt(apiTransaction.timeStamp) * 1000);
        transaction.description = "";
        transaction.from = apiTransaction.from;
        transaction.to = apiTransaction.to;
        transaction.currency = currency;
        transaction.wallet = wallet;
        const amount = new bignumber_js_1.BigNumber(apiTransaction.value).div(new bignumber_js_1.BigNumber(10).pow(currency.decimals));
        transaction.amount = amount.toNumber();
        console.log(transaction);
        return transaction;
    }
}
__decorate([
    core_1.dependency,
    __metadata("design:type", wallets_service_1.Wallets)
], Transactions.prototype, "wallets", void 0);
exports.Transactions = Transactions;
//# sourceMappingURL=transactions.service.js.map