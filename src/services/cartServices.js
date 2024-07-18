import Services from "./classServices.js";
import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
const prodDao = new ProductDaoMongoDB();
import CartDaoMongoDB from "../daos/mongodb/cart.dao.js";
const cartDao = new CartDaoMongoDB();

export default class CartServices extends Services {
  constructor() {
    super(cartDao);
  }

  addProductToCart = async (cartId, prodId) => {
    try {
      const existCart = await getById(cartId);
      if (!existCart) return null;
      const existProd = await prodDao.getById(prodId);
      if (!existProd) return null;
      return await this.dao.addProductToCart(cartId, prodId);
    } catch (error) {
      throw new Error(error);
    }
  };

  removeProdToCart = async (cartId, prodId) => {
    try {
      const existCart = await getById(cartId);
      if (!existCart) return null;
      const existProd = await this.dao.existProd(cartId, prodId);
      if (!existProd) return null;
      return await this.dao.removeProdToCart(cartId, prodId);
    } catch (error) {
      throw new Error(error);
    }
  };

  updateProdQuantityToCart = async (cartId, prodId, quantity) => {
    try {
      const existCart = await getById(cartId);
      if (!existCart) return null;
      const existProd = await this.dao.existProd(cartId, prodId);
      if (!existProd) return null;
      return await this.dao.updateProdQuantityToCart(cartId, prodId, quantity);
    } catch (error) {
      throw new Error(error);
    }
  };

  clearCart = async (cartId) => {
    try {
      const existCart = await getById(cartId);
      if (!existCart) return null;
      return await this.dao.clearCart(cartId);
    } catch (error) {
      throw new Error(error);
    }
  };
}
