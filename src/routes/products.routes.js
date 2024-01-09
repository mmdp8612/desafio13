import { Router } from "express";
import { 
    getAllProducts, 
    getProductById, 
    postProduct, 
    updateProduct, 
    deleteProduct
} from "../controllers/products.controller.js";
import { verifyAuthenticateToken, isAdmin, isAdminOrPremium } from "../middlewares/auth.js";

const router = Router();
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", [verifyAuthenticateToken, isAdmin], postProduct);
router.put("/:id", [verifyAuthenticateToken, isAdmin], updateProduct);
router.delete("/:id", [verifyAuthenticateToken, isAdminOrPremium], deleteProduct);

export default router;