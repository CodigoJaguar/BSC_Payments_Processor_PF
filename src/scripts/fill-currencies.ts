import { createConnection, DataSource } from "typeorm";
import { Currency, Transaction, Wallet } from "../app/entities";

export const schema = {
  additionalProperties: false,
  properties: {

  },
  required: [

  ],
  type: 'object',
};

  const DAI = {
    name: 'Day Token',
    symbol: 'DAI',
    decimals: 18 ,
    contract: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
    url: "https://bscscan.com/token/0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
  }

  const BUSD = {
    name: 'BUSD Token',
    symbol: 'BUSD',
    decimals: 18,
    contract: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    url: 'https://bscscan.com/token/0xe9e7cea3dedca5984780bafc599bd69add087d56',
  }

  const USDT = {
    name: 'BSC-USD',
    symbol: 'USDT',
    decimals: 18,
    contract: '0x55d398326f99059fF775485246999027B3197955',
    url: 'https://bscscan.com/token/0x55d398326f99059ff775485246999027b3197955',
  }


const currencies = [


]

export async function main(args: any) {
//  const connection = await createConnection();
  const AppDataSource = new DataSource({
    type: "better-sqlite3",
    // host: "any",
    // port: 5433,
    // username: "test",
    // password: "test",
    database: "./db.sqlite3", // .\bsc_payments_processor\db.sqlite3    ./main.sqlite
    entities: [Currency,Transaction,Wallet],
    synchronize: true,
    logging: true,
    subscribers: [],
    migrations:[]
    // type: 'postgres',
    // url:'postgres://cankvfix:KB4cnm-mIFHfmYPFeyKtPXxq4NZ9J3EE@mahmud.db.elephantsql.com/cankvfix',
    // host: 'mahmud.db.elephantsql.com',
    // port : 5432,
    // username: 'cankvfix',
    // password: 'KB4cnm-mIFHfmYPFeyKtPXxq4NZ9J3EE',
    // database: 'cankvfix',
    // entities: [Currency,Transaction],
    // synchronize: true,
    // logging: true,
    // subscribers: [],
    // migrations:[]
})
await AppDataSource.initialize()

  try {


    const Check1 = await Currency.findOne( {where: {contract : DAI.contract}});
    const Check2 = await Currency.findOne( {where: {contract : BUSD.contract}});
    const Check3 = await Currency.findOne( {where: {contract : USDT.contract}});

    if(!Check1) {
          const newCurrency = Currency.create({
            name: 'Day Token',
            symbol: 'DAI',
            decimals: 18 ,
            contract: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
            url: "https://bscscan.com/token/0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
          });
          await newCurrency.save();
          console.log("Currency created",DAI)
        }else{
          console.log(`Currency ${DAI.name} already exists`)
        }

    if(!Check2) {
        const newCurrency = Currency.create({
          name: 'BUSD Token',
          symbol: 'BUSD',
          decimals: 18,
          contract: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
          url: 'https://bscscan.com/token/0xe9e7cea3dedca5984780bafc599bd69add087d56',
        });
        await newCurrency.save();
        console.log("Currency created",BUSD)
      }else{
        console.log(`Currency ${BUSD.name} already exists`)
      }

      if(!Check3) {
        const newCurrency = Currency.create({
          name: 'BSC-USD',
          symbol: 'USDT',
          decimals: 18,
          contract: '0x55d398326f99059fF775485246999027B3197955',
          url: 'https://bscscan.com/token/0x55d398326f99059ff775485246999027b3197955',
        });
        await newCurrency.save();
        console.log("Currency created",USDT)
      }else{
        console.log(`Currency ${USDT.name} already exists`)
      }



    // for(const data of currencies){
    //   const exists = await Currency.findOne( {where: {contract : data.contract}} );
    //   if(!exists) {
    //     const newCurrency = Currency.create(data);
    //     await newCurrency.save();
    //     console.log("Currency created",data)
    //   }else{
    //     console.log(`Currency ${data.name} already exists`)
    //   }
    // }

  } catch (error) {
    console.log(error);
  }finally{
    //await connection.close();
  }

}




// { 
//   name: 'BSC-USD',
//   symbol: 'USDT',
//   decimals: 18,
//   contract: '0x55d398326f99059fF775485246999027B3197955',
//   url: 'https://bscscan.com/token/0x55d398326f99059ff775485246999027b3197955'
// },

// {
//   name: 'BUSD Token',
//   symbol: 'BUSD',
//   decimals: 18,
//   contract: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
//   url: 'https://bscscan.com/token/0xe9e7cea3dedca5984780bafc599bd69add087d56'
// },

// {
//   name: 'Day Token',
//   symbol: 'DAI',
//   decimals: 18 ,
//   contract: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
//   url: "https://bscscan.com/token/0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3"
// },

// {
//   name: 'BUSD Token',
//   symbol: 'BUSD',
//   decimals: 18,      //  <------- Este estupido si se le pone una s se rompe todo alv, no hay razon para que se rompa, en que mundo vivo?, algo de TS que deba saber? 
//   contract: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
//   url: 'https://bscscan.com/token/0xe9e7cea3dedca5984780bafc599bd69add087d56'
// },
