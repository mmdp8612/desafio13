import { Router } from "express";

const router = Router();

router.get('/', (req, res)=>{
    req.logger.error("Prueba log - nivel error");
    req.logger.log("error", "Prueba log - nivel error");
    req.logger.warn("Prueba log - nivel warn");
    req.logger.info("Prueba log - nivel info");
    req.logger.http("Prueba log - nivel http");
    req.logger.verbose("Prueba log - nivel verbose");
    req.logger.debug("Prueba log - nivel debug");
    req.logger.silly("Prueba log - nivel silly");
    return res.status(200).json({
        message: "Logger Test!"
    });
});

export default router;