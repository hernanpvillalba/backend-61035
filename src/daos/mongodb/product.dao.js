import MongoDao from "./mongo.dao.js";
import { ProductModel } from "./models/productModels.js";


export default class ProductDaoMongoDB extends MongoDao {
  constructor(){
    super(ProductModel);
  }
};

