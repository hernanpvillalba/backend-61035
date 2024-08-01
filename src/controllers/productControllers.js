import Controllers from "./classController.js";
import ProductService from "../services/productServices.js";
const prodService = new ProductService();

export default class ProductController extends Controllers {
    constructor(){
        super(prodService);
    }
};