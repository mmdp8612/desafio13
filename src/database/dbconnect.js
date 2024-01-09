import { config } from "../config/config.js";
import mongoose from "mongoose";
class MongoDB { 

    static #instancia;

    constructor(){
        mongoose.connect(config.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    static conectarDB(){
        if(this.#instancia){
            console.log("Conexion a DB establecida previamente");
            return this.#instancia;
        }

        try {
            this.#instancia=new MongoDB();
            console.log("Conexion a DB establecida");
            return this.#instancia;
        }catch(error){
            console.error('Error de conexión a la base de datos:', error);
        }
    }
}

export {
    MongoDB
};