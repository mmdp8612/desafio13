import { Router } from "express";
import {
    createCart,
    getProductsCart,
    addProductCart,
    updateQuantityCart,
    updateProductsCart,
    deleteProductCart,
    deleteAllProducts,
    finalizePurchase
} from "../controllers/cart.controller.js";
import { verifyIsUser, verifyAuthenticateToken } from "../middlewares/auth.js";

const router = Router();

router.post("/", createCart);
router.post("/:cid/purchase", [verifyAuthenticateToken], finalizePurchase);
router.get("/:cid", getProductsCart);
router.post("/:cid/:pid", [verifyAuthenticateToken, verifyIsUser], addProductCart);
router.put("/:cid", updateProductsCart);
router.put("/:cid/:pid", updateQuantityCart);
router.delete("/:cid/:pid", deleteProductCart);
router.delete("/:cid", deleteAllProducts);

export default router;