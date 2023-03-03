import { Context, dependency, Get, HttpResponseOK } from '@foal/core';
import { Wallet } from '../entities';
import { BscScanApi, Transactions } from '../services';

export class ApiController {
  @dependency
  private bscscanApi : BscScanApi;

  @dependency
  private transactionsServices : Transactions;

  @Get('/')
  async index(ctx: Context) {
    const transactions = await this.bscscanApi.listTransactions();
    return new HttpResponseOK({transactions});
  }

  @Get('/procesar')
  async procesarTransacciones(ctx: Context) {
    const transactions = await this.bscscanApi.listTransactions();
    this.transactionsServices.processTransactions(transactions)
    return new HttpResponseOK({transactions});
  }

  
  @Get('/getBalance/:id')
  async readBalance({ request }: Context) {
    const Id = request.params;
    console.log(Id)
    const balance = await Wallet.find({where: {id: Id.id}});
    return new HttpResponseOK(balance);
  }




}
