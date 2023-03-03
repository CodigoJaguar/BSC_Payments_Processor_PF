import { Wallet } from "../entities";

export class Wallets {

    async findWallet(address:string){
        // const wallet = await Wallet.createQueryBuilder('w')
        // .where('LOWER(w,id) = :address', {address} )
        // .getOne();
        const wallet = await Wallet.createQueryBuilder('w')
        .where('LOWER(id) = :address', {address} )   
        .getOne();

        return wallet || null;
    }

    // private async getOrCreateWallet(id:string){      ultimo paso pero ya funciona, lo dejo asi
    //     let wallet = await this.wallets.findWallet(id);

    //     if(!wallet){
    //         wallet= Wallet.create({id, balance : 0})
    //         await wallet.save();
    //     }
    //     return wallet
    // }

   

}
