import Services from "./classServices.js";
import ProductDaoMongo from "../daos/mongodb/product.dao.js";

const prodDao = new ProductDaoMongo();

export default class ProductService extends Services {
    constructor(){
        super(prodDao);
    }
};