import Services from "./classServices.js";
import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";

const productDao = new ProductDaoMongoDB();

export default class ProductService extends Services {
  constructor() {
    super(productDao);
  }
}
