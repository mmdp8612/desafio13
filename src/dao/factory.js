import { config } from "../config/config.js";

let DaoProduct;
let DaoMessage;
let DaoCart;
let DaoTicket;

switch (config.PERSISTENCE) {
    case "FS":
        DaoProduct = await import('./ProductManager.js');
        DaoMessage = await import('./MessageManager.js');
        DaoCart = await import('./CartManager.js');
        DaoTicket = await import('./TicketManager.js');
        DaoProduct = DaoProduct.ProductManager;
        DaoMessage = DaoMessage.MessageManager;
        DaoCart = DaoCart.CartManager;
        DaoTicket = DaoTicket.TicketManager;
        break;

    case "MONGO":
        DaoProduct = await import('./ProductMongo.js');
        DaoMessage = await import('./MessageMongo.js');
        DaoCart = await import('./CartMongo.js');
        DaoTicket = await import('./TicketMongo.js');
        DaoProduct = DaoProduct.ProductMongo;
        DaoMessage = DaoMessage.MessageMongo;
        DaoCart = DaoCart.CartMongo;
        DaoTicket = DaoTicket.TicketMongo;
        break;

    default:
        throw new Error("Persistencia invalida")
}

export {
    DaoProduct,
    DaoMessage,
    DaoCart,
    DaoTicket
}