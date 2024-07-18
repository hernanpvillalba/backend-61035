import { Router } from "express";
import productRouter from "./productRouter.js";
import userRouter from "./userRouter.js";
import cartRouter from "./cartRouter.js";

export default class MainRouter{
    constructor(){
        this.router = Router();
        this.init();

    }

    init(){
        this.router.use('./products', productRouter)
        this.router.use('./users', userRouter)
        this.router.use('./cart', cartRouter)

    }

    getRouter(){
        return this.router  
    }
}