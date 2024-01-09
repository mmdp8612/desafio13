import { Router } from "express";
import passport from "passport";
import { 
    callbackGithub,
    errorGithub,
    github,
    login,
    register,
    olvido,
    recuperar
} from "../controllers/auth.controller.js";

const router = Router();
router.post("/login", login);
router.post("/register", register);
router.get('/github', github);
router.get('/callbackGitHub', callbackGithub);
router.get('/errorGitHub', errorGithub);
router.post('/olvido', olvido);
router.post('/recuperar', recuperar);

export default router;