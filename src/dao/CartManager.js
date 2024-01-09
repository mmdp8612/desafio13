import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from 'uuid';

class CartManager {
    constructor(){
        const __filename = fileURLToPath(import.meta.url);
        this.path = path.join(path.dirname(__filename), '../data/cart.json');
        this.loadCart();
    }

    async loadCart(){
        try {
            this.cart = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
        } catch (error) {
            this.cart = [];
        }
    }

    async createCart(){
        try{
            const newProductCart = {
                id: uuidv4(),
                products: []
            }
            this.cart.push(newProductCart);
            await fs.promises.writeFile(this.path, JSON.stringify(this.cart));
            return newProductCart;
        }catch(error){
            throw new Error(error);
        }
    }

    async getProductsCart(cid){
        const cartProducts = this.cart.find((c) => c.id === cid);
        if(cartProducts && cartProducts.products.length !== 0){
            return cartProducts;
        }else{
            throw new Error(`Empty cart`);
        }
    }

    async addProductCart(cid, pid){
        this.loadCart();
        const cartProducts = this.cart.find((c) => c.id === cid);
        if(cartProducts){
            const newProduct = {
                productId: pid,
                quantity: 1
            };
            const findProduct = cartProducts.products.find((p) => p.productId === pid);
            if(findProduct){
                cartProducts.products.map((p) => {
                    if(p.productId === pid){
                        p.quantity++;
                    }
                });   
            }else{
                cartProducts.products.push(newProduct);
            }
            await fs.promises.writeFile(this.path, JSON.stringify(this.cart));
        }else{
            throw new Error(`Cart Not Found!`);
        }
    }
}   

export default CartManager;