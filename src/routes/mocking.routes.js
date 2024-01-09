import { Router } from "express";
import { 
    getMockingProducts
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", getMockingProducts);

export default router;