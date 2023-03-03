"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallets = void 0;
const entities_1 = require("../entities");
class Wallets {
    async findWallet(address) {
        // const wallet = await Wallet.createQueryBuilder('w')
        // .where('LOWER(w,id) = :address', {address} )
        // .getOne();
        const wallet = await entities_1.Wallet.createQueryBuilder('w')
            .where('LOWER(id) = :address', { address })
            .getOne();
        return wallet || null;
    }
}
exports.Wallets = Wallets;
//# sourceMappingURL=wallets.service.js.map