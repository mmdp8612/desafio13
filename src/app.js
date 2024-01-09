import express from "express";
import { config } from "./config/config.js";
import { engine } from 'express-handlebars';
import session from 'express-session';
import path, { dirname } from 'path';
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import { verifySession } from "./middlewares/session.js";
import { inicializaPassport } from "./config/passport.config.js";
import passport from "passport";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import routerUsers from "./routes/users.routes.js";
import routerAuth from "./routes/auth.routes.js";
import routerProducts from "./routes/products.routes.js";
import routerCart from "./routes/cart.routes.js";
import routerView from "./routes/view.routes.js";
import routerMocking from "./routes/mocking.routes.js";
import routerLogger from "./routes/logger.routes.js";
import { MessageMongo } from "./dao/MessageMongo.js";
import { MongoDB } from "./database/dbconnect.js";
import { errorHandler } from './middlewares/errorHandler.js';
import { logger, mLogger } from "./utils/loggers.js";

global.passwordResetTokens = {}; 

const messageMongo = new MessageMongo();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

MongoDB.conectarDB();

const app = express();

const optionsSwagger = {
    definition:{
        openapi: '3.0.0',
        info: {
            title: 'API Ecommerce',
            version: '1.0.0',
            description: 'Documentación del proyecto API Ecommerce'
        }
    },
    security: [{
        bearerAuth: []
    }],
    securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
    },
    apis: ["src/docs/*.yaml"]
}

const specs = swaggerJsdoc(optionsSwagger);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.engine("handlebars", engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: config.SESSION_KEY, 
    resave: false,  
    saveUninitialized: true, 
}));

inicializaPassport();
app.use(passport.initialize());
app.use(passport.session())

app.use(verifySession);

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());

app.use(mLogger);

app.use("/api/users", routerUsers);
app.use("/api/auth", routerAuth);
app.use("/api/products", routerProducts);
app.use("/api/cart", routerCart);
app.use("/view", routerView);
app.use("/mockingproducts", routerMocking);
app.use("/loggerTest", routerLogger);

app.use(errorHandler);

const server = app.listen(config.PORT, () => {
    console.log(`Server on port ${config.PORT}...`);
});

const io = new Server(server);

io.on('connection', (socket) => {
    console.log(`The user with id [${socket.id}] has connected`);
    
    socket.on("newProduct", async (product) => {
        const { title, description, price, code, stock, status, category } = product;        
        const estado = (status==1)?true:false;
        await productManager.addProduct(title, description, price, code, stock, estado, category);        
        const products = await productManager.getProducts();
        socket.emit("updateProducts", products);
    });

    socket.on("removeProduct", async (id) => {
        await productManager.deleteProduct(id);
        const products = await productManager.getProducts();
        socket.emit("updateProducts", products);
    })

    socket.on('disconnect', () => {
      console.log('The user has logged out');
    });

    socket.on('nickname', async (nickname) => {
        const date = new Date();
        const datetime = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        socket.emit('chatWelcome', {
            fechahora: datetime,
            transmitter: 'Server',
            message: `Bienvenido ${ nickname } a la sala de chat!`,
            listMessages: await messageMongo.getMessages()
        });
    });

    socket.on('newMessage', async (message) => {
        await messageMongo.addMessage(message);
        io.emit('messageReceived', message);
    });
});
