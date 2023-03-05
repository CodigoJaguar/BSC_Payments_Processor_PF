import { Context, dependency, Get, Hook, HttpResponseNoContent, HttpResponseOK, Options } from '@foal/core';
import { Transaction, Wallet } from '../entities';
import { BscScanApi, Transactions } from '../services';

export class ApiController {
  @dependency
  private bscscanApi : BscScanApi;

  @dependency
  private transactionsServices : Transactions;

  @Hook(() => response => {
    // Every response of this controller and its sub-controllers will be added this header.
    response.setHeader('Access-Control-Allow-Origin', '*');
  })

  @Options('*')
  options(ctx: Context) {
    const response = new HttpResponseNoContent();
    response.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.setHeader('Access-Control-Allow-Origin', '*');
    return response;
  }

  @Get('/')
  async index(ctx: Context) {
    const transactions = await this.bscscanApi.listTransactions();
    
    const response =new HttpResponseOK({transactions});
    response.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, PUT, PATCH, DELETE');
    // You may need to allow other headers depending on what you need.
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return response;
    
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

  @Get('/getWalletDonated/:id')
  async readWallets({ request }: Context) {
    const Id = request.params;
    console.log(Id)
    const transactions = await this.bscscanApi.listTransactions();
    this.transactionsServices.processTransactions(transactions)
    const list = await Transaction.find({where: {to: Id.id}});
    const response = new HttpResponseOK(list);

    response.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.setHeader('Access-Control-Allow-Origin', '*');
    return response

  }




}
