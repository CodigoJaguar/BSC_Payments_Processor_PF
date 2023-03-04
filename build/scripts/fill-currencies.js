"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.schema = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../app/entities");
exports.schema = {
    additionalProperties: false,
    properties: {},
    required: [],
    type: 'object',
};
const currencies = [
    {
        name: 'BSC-USD',
        symbol: 'USDT',
        decimals: 18,
        contract: '0x55d398326f99059fF775485246999027B3197955',
        url: 'https://bscscan.com/token/0x55d398326f99059ff775485246999027b3197955'
    },
    {
        name: 'BUSD Token',
        symbol: 'BUSD',
        decimals: 18,
        contract: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
        url: 'https://bscscan.com/token/0xe9e7cea3dedca5984780bafc599bd69add087d56'
    },
    {
        name: 'Day Token',
        symbol: 'DAI',
        decimals: 18,
        contract: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
        url: "https://bscscan.com/token/0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3"
    },
    {
        name: 'BUSD Token',
        symbol: 'BUSD',
        decimal: 18,
        contract: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
        url: 'https://bscscan.com/token/0xe9e7cea3dedca5984780bafc599bd69add087d56'
    },
];
async function main(args) {
    //  const connection = await createConnection();
    const AppDataSource = new typeorm_1.DataSource({
        type: "better-sqlite3",
        // host: "any",
        // port: 5433,
        // username: "test",
        // password: "test",
        database: "./db.sqlite3",
        entities: [entities_1.Currency, entities_1.Transaction, entities_1.Wallet],
        synchronize: true,
        logging: true,
        subscribers: [],
        migrations: []
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
    });
    await AppDataSource.initialize();
    try {
        for (const data of currencies) {
            const exists = await entities_1.Currency.findOne({ where: { contract: data.contract } });
            if (!exists) {
                const newCurrency = entities_1.Currency.create(data);
                await newCurrency.save();
                console.log("Currency created", data);
            }
            else {
                console.log(`Currency ${data.name} already exists`);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
    finally {
        //await connection.close();
    }
}
exports.main = main;
//# sourceMappingURL=fill-currencies.js.map