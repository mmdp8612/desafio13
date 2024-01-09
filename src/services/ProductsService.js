import { DaoProduct as DAO } from "../dao/factory.js";
class ProductsService {
    constructor(dao){
        this.dao = new dao();
    }

    async getProducts(paginate=null, search=null){
        return await this.dao.getProducts(paginate, search);        
    }

    async addProduct(title, description, price, code, stock, status, category, thumbnail=null){
        return await this.dao.addProduct(title, description, price, code, stock, status, category, thumbnail);
    }

    async getProductById(productId){
        return await this.dao.getProductById(productId);
    }

    async updateProduct(productId, params){
        return await this.dao.updateProduct(productId, params);
    }

    async deleteProduct(productId, user){
        return await this.dao.deleteProduct(productId, user);
    }

    getMockingProducts(){
        return this.dao.getMockingProducts();
    }
}

export const productsService = new ProductsService(DAO);