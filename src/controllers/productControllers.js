import Controllers from "./classController.js";
import ProductService from "../services/productServices.js";
const productService = new ProductService()

export default class ProductController extends Controllers{
  constructor(){
    super(productService)
  }
}