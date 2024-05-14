import express from "express";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import handlebars from 'express-handlebars';
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(express.static('./src/public'))

app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use(errorHandler);

app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

app.get('/realtimeproducts', (req, res)=>{
    res.render('realtimeproducts')
})

const httpServer = app.listen(8080, () => console.log(`Server OK en el puerto 8080`));

const socketServer = new Server(httpServer)

const products = []

socketServer.on('connection', (socket)=>{
    console.log(`Usuario conectado: ${socket.id}`);
    socket.on('disconnect', ()=>{
        console.log('Usuario desconectado');
    })

    socket.on('newProduct', (prod)=>{
        products.push(prod);
        socketServer.emit('products', products);
    })
})