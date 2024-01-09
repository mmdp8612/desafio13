import { Router } from "express";
import {
    login,
    register,
    logout,
    profile,
    products,
    productsById,
    cartProducts,
    realTimeProducts,
    chat,
    home,
    olvido,
    recuperar
} from "../controllers/view.controller.js";
import { verifyAuth, isUser } from "../middlewares/auth.js";

const router = Router();

router.get("/login", login);
router.get("/register", register);
router.get("/olvido", olvido);
router.get("/recuperar/:token", recuperar);
router.get("/logout", logout);
router.get("/profile", verifyAuth, profile);
router.get("/products", verifyAuth, products);
router.get("/products/:pid", verifyAuth, productsById);
router.get("/cart/:cid", verifyAuth, cartProducts);
router.get("/realtimeproducts", realTimeProducts);
router.get("/chat", [verifyAuth, isUser], chat);
router.get("/home", home);

export default router;