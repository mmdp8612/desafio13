import { DaoCart as DAO} from "../dao/factory.js"

class CartService {
    constructor(dao){
        this.dao = new dao();
    }

    async createCart(){
        return await this.dao.createCart();
    }

    async getProductsCart(cid){
        return await this.dao.getProductsCart(cid);    
    }

    async addProductCart(cid, pid){
        return await this.dao.addProductCart(cid, pid);
    }

    async deleteProductCart(cid, pid){
        return await this.dao.deleteProductCart(cid, pid);
    }

    async updateProductsCart(cid, arrProducts){
        return await this.dao.updateProductsCart(cid, arrProducts);
    }

    async updateQuantityCart(cid, pid, quantity){
        return await this.dao.updateQuantityCart(cid, pid, quantity);
    }

    async deleteAllProducts(cid){
        return await this.dao.deleteAllProducts(cid);
    }

    async finalizePurchase(cid){
        return await this.dao.finalizePurchase(cid);
    }
}

export const cartService = new CartService(DAO);