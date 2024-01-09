import supertest from "supertest";
import chai from "chai";
import mongoose from "mongoose";
import { describe, it } from "mocha";
import Product from "../src/dao/models/Product.js";
import { config } from "../src/config/config.js";

await mongoose.connect(config.MONGO_DB);

const expect = chai.expect;

const requester = supertest(`http://localhost:${config.PORT}`);

describe("Pruebas al proyeto Ecommerce", function(){
    
    this.timeout(6000);
    this.authToken = null;

    before(async function () {
        const loginResponse = await requester.post("/api/auth/login").send({
            email: "mmdp8612@gmail.com",
            password: "123456"
        }).set("Content-Type", "application/json");
        this.authToken = loginResponse.body.token;
    });

    describe("Pruebas al módulo Productos", async function(){
        
        before(async function(){
            await mongoose.connection.collection("products").deleteMany({ code: "TEST000" });
        });

        it("Endpoint /api/products - POST - Crear un Producto nuevo", async function(){
            const response = await requester.post("/api/products").send({
                owner: "admin",
                title: "Test",
                description: "Test",
                price: 100,
                code: "TEST000",
                stock: 33,
                category: 1,
                status: true
            })
            .set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${this.authToken}`);
    
            expect(response.status).to.equal(200);
            expect(response.body).to.include({message: "Product created!"});
        });

        
        it("Endpoint /api/products - GET - Obtener Productos", async function(){
            const response = await requester.get("/api/products");
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property("data").that.is.an("array");
            response.body.data.forEach((product) => {
                expect(product).to.have.property("title").that.is.a("string");
                expect(product).to.have.property("description").that.is.a("string");
                expect(product).to.have.property("price").that.is.a("number");
                expect(product).to.have.property("code").that.is.a("string");
                expect(product).to.have.property("stock").that.is.a("number");
            });
        });

    });

    describe("Pruebas al módulo Carrito", async function (){
        it("Endpoint /api/cart - POST - Crea nuevo Carrito", async function (){
            
            const response = await requester.post("/api/cart");
            
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property("message", "Cart created!"); 
            expect(response.body).to.have.property("cart");

            const cart = response.body.cart;

            expect(cart).to.have.property("_id").that.is.a("string"); 
            expect(cart).to.have.property("products").that.is.an("array"); 
            expect(cart).to.have.property("__v").that.is.a("number"); 
        });

        it("Endpoint /api/cart/:cid - GET - Obtiene productos de un carrito", async function (){
            
            const cartId = "65142d85fbe139448546c10f";
            const response = await requester.get(`/api/cart/${cartId}`);
            
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an("array"); 

            response.body.forEach(item => {
                expect(item).to.have.property("product").that.is.an("object"); 
                expect(item.product).to.have.property("_id").that.is.a("string"); 
                expect(item.product).to.have.property("title").that.is.a("string");
                expect(item).to.have.property("quantity").that.is.a("number");
                expect(item).to.have.property("_id").that.is.a("string");
            });
        });

        before(async function () {
            const loginResponse = await requester.post("/api/auth/login").send({
                email: "user@gmail.com",
                password: "123456"
            }).set("Content-Type", "application/json");
            this.authToken = loginResponse.body.token;
        });

        it("Endpoint /api/cart/:cid/:pid - POST - Agrega un producto al carrito", async function (){
            
            const cartId = "65142d85fbe139448546c10f";
            const productId = "6513306803d6bf40717b4a2f";
            
            expect(cartId).to.exist; 
            expect(cartId).to.not.be.undefined;

            expect(productId).to.exist; 
            expect(productId).to.not.be.undefined;
            
            const response = await requester.post(`/api/cart/${cartId}/${productId}`).set("Authorization", `Bearer ${this.authToken}`);
            
            expect(response.status).to.equal(200);
            expect(response.body).to.include({message: "Product added to cart succesfuly"});
        });
    });
});