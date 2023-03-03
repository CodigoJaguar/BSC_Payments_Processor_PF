"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BscScanApi = void 0;
const core_1 = require("@foal/core");
const axios = require("axios");
// Ctrl + . = importa la dependencia
//https://api.bscscan.com/api
// ?module=account
// &action=tokentx
// &contractaddress=0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51
// &address=0x7bb89460599dbf32ee3aa50798bbceae2a5f7f6a
// &page=1
// &offset=5
// &startblock=0
// &endblock=999999999
// &sort=asc
// &apikey=YourApiKeyToken
const apiUrl = 'https://api.bscscan.com/api';
class BscScanApi {
    constructor() {
        this.loadSettings();
    }
    async listTransactions(initialBlock = 0) {
        const action = 'module=account&action=tokentx';
        const url = `${apiUrl}?${action}&address=${this.wallet}&startblock=${initialBlock}&endblock=99999999&sort=desc&apikey=${this.key}`;
        console.log(url);
        const response = await axios.default.get(url);
        if (response.status !== 200) {
            throw new Error('Error code:' + response.status);
        }
        //const json = response.data;
        const bscScanResponse = response.data;
        return bscScanResponse.result;
    }
    loadSettings() {
        const key = core_1.Env.get('BSCSCAN_KEY');
        if (!key)
            throw new Error('BSCSCAN key is undefined');
        this.key = key;
        console.log('API key loaded');
        const wallet = core_1.Env.get('WALLET');
        if (!wallet)
            throw new Error('Wallet is undefined');
        this.wallet = wallet;
        console.log('Wallet key loaded');
    }
}
exports.BscScanApi = BscScanApi;
//# sourceMappingURL=bsc-scan-api.service.js.map