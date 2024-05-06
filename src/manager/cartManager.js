import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import ProductManager from "./productManager.js";

const productManager = new ProductManager("./src/data/products.json");

export default class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const carts = await fs.promises.readFile(this.path, "utf8");
        const cartsJSON = JSON.parse(carts);
        return cartsJSON;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async createCart(obj) {
    try {
      const cart = {
        id: uuidv4(),
        ...obj,
        products: [],
      };
      const cartsFile = await this.getCarts();
      cartsFile.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((c) => c.id === id);
      if (!cart) return null;
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async saveProductToCart(idCart, idProduct) {
    try {
      const productExist = await productManager.getProductById(idProduct);
      if (!productExist) throw new Error("product not exist");
      const cartExist = await this.getCartById(idCart);
      if (!cartExist) throw new Error("cart not exist");
      let cartDetail = await this.getCarts();
      const prodExistInCart = cartExist.products.find(
        (prod) => prod.id === idProduct
      );
      if (!prodExistInCart) {
        const product = {
          id: idProduct,
          quantity: 1,
        };
        cartExist.products.push(product);
      } else prodExistInCart.quantity++;
      const updatedCArt = cartDetail.map((cart) => {
        if (cart.id === idCart) return cartExist;
        return cart;
      });
      await fs.promises.writeFile(this.path, JSON.stringify(updatedCArt));
      return cartExist;
    } catch (error) {
      throw new Error(error);
    }
  }
}
