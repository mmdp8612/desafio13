import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createLogger, transports, format } from "winston";
import { config } from "../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const pathGeneral = path.join(path.dirname(__filename), '../logs/general.log');
const pathError = path.join(path.dirname(__filename), '../logs/errors.log');

const transportGeneralFile = new transports.File({
    level: 'info',
    filename: pathGeneral
});

const transportErrorFile = new transports.File({
    level: 'error',
    filename: pathError
});

const transportConsole = new transports.Console({
    level: 'debug'
});

const logger = new createLogger({
    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf(data => `[${data.timestamp}] ${data.level.toUpperCase()}: ${data.message}`)
    ),
    transports: [
        transportGeneralFile,
        transportErrorFile
    ]
});

if(config.MODE === "development"){
    logger.add(transportConsole);
}

const mLogger = (req, res, next)=>{
    req.logger=logger
    next()
}

export { 
    logger,
    mLogger
}