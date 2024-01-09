import {fakerES_MX as faker} from '@faker-js/faker'
import Product from "./models/Product.js";
import { CustomError } from '../utils/customError.js';
import { tiposDeError } from '../utils/tiposDeError.js';
import { validateProduct } from '../utils/productError.js';

export class ProductMongo {

    constructor(){ 

    }

    async getProducts(paginate=null, search=null){
        try {
            const { limit, page, order } = paginate;
            const sort = order === 'ASC' ? { price: 1 } : order === 'DESC' ? { price: -1 } : null;
            const query = search ? { title: { $regex: search, $options: 'i' } } : {};
            return await Product.paginate(query, {limit, page, sort});
        } catch (error) {
            throw new Error(error);
        }
    }

    async addProduct(title, description, price, code, stock, status, category, thumbnail=null){
        try {
            const data = {
                title, 
                description, 
                price, 
                code, 
                stock, 
                status, 
                category,
                thumbnail
            }
            const product = new Product(data);
            await product.save();
        } catch (error) {
            throw new Error(error);
        }
        
    }

    async getProductById(productId){
        try {
            return await Product.findById(productId);
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateProduct(productId, params){
        try {
            await Product.findByIdAndUpdate(productId, params, { new: true });
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteProduct(productId, user){
        try {
            const product = await Product.findById(productId);
            if (!product) {
                throw new Error('Product not found');
            }

            if(user.role === "premium" && product.owner !== user.email){
                throw new Error('User not authorized to delete this product');
            }

            await Product.findByIdAndDelete(productId);
        } catch (error) {
            throw new Error(error);
        }
    }

    getMockingProducts(){
        const listProducts = [];
        for(let i=0; i<100; i++){
            listProducts.push({
                title: faker.commerce.product(),
                description: faker.commerce.productDescription(),
                price: faker.commerce.price({ min: 500, max: 10000, dec: 2 }),
                thumbnail: faker.image.urlPlaceholder({width: 400, height: 400, format: 'jpg'}),
                stock: faker.number.int({min:0, max:100})
            });
        }
        return listProducts;       
    }
}