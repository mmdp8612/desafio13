import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from 'uuid';

class ProductManager {
    constructor(){
        const __filename = fileURLToPath(import.meta.url);
        this.path = path.join(path.dirname(__filename), '../data/products.json');
        this.loadProducts();
    }

    async loadProducts(){
        try {
            this.products = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
        } catch (error) {
            this.products = [];
        }
    }
    
    getProducts(limit=null){
        if(this.products.length === 0){
            return {
                statusCode: 404,
                message: `No products found`
            }
        }

        if(limit){
            return this.products.slice(0, limit);
        }

        return this.products;
    }

    async addProduct(title, description, price, code, stock, status, category, thumbnail=null){
        
        if(title==="" || description==="" || price === "" || code === "" || stock === "" || status === "" || category === ""){
            throw new Error(`All fields are required`);
        }

        const product = this.products.find((product)=>product.code === code);
        
        if(product){
            throw new Error(`Product with code ${code} duplicated`);
        }

        const newProduct = {
            id: uuidv4(),
            title,
            description,
            price,
            thumbnail,
            code, 
            stock,
            status, 
            category
        };
        
        this.products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
    }

    getProductById(productId){
        try {
            this.loadProducts();
            const findProduct = this.products.find((product) => product.id == productId);
            if(!findProduct){
                return {
                    statusCode: 404,
                    message: `Product Not Found`
                };   
            }
            return findProduct;
        } catch (error) {
            return [];
        }
    }

    async updateProduct(productId, params){
        
        const { title, description, price, code, stock, status, category } = params;

        if(title==="" || description==="" || price === "" || code === "" || stock === "" || status === "" || category === ""){
            throw new Error(`All fields are required`);
        }
        
        try{
            await this.loadProducts();
            this.products = this.products.map((product) => {
                if(product.id === productId){
                    return { ...product, ...params }
                }
                return product;
            });
            await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        }catch(error){
            throw new Error(error);
        }
    }

    async deleteProduct(productId){
        try{
            await this.loadProducts();
            this.products = this.products.filter((product) => product.id !== productId);
            await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        }catch(error){
            throw new Error(error);
        }
    }
}

export default ProductManager;