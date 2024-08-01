import { Router } from "express";
import productRouter from './productRouter.js';
import userRouter from './userRouter.js';
import cartRouter from './cartRouter.js';
import ticketRouter from './ticketRouter.js';

export default class MainRouter {
    constructor(){
        this.router = Router();
        this.init();
    }

    init(){
        this.router.use('/products', productRouter);
        this.router.use('/users', userRouter);
        this.router.use('/carts', cartRouter);
        this.router.use('/ticket', ticketRouter);
    }

    getRouter(){
        return this.router;
    }
}