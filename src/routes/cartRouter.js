import { Router } from "express";
import CartManager from "../manager/cartManager.js";

const cartManager = new CartManager("./src/data/cart.json");

const router = Router();

router.post("/:idCart/product/:idProduct", async (req, res, next) => {
  try {
    const { idProduct } = req.params;
    const { idCart } = req.params;
    const response = await cartManager.saveProductToCart(idCart, idProduct);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const response = await cartManager.createCart();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    res.json(await cartManager.getCartById(id));
  } catch (error) {
    next(error);
  }
});

export default router;
