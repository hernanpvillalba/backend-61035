import MongoDao from "./mongo.dao.js";
import { ProductModel } from './models/productModel.js';

export default class ProductDaoMongo extends MongoDao {
    constructor(){
        super(ProductModel);
    }
};