import { Router } from "express";
import ProductManager from "../manager/productManager.js";
import { productValidator } from "../middlewares/productValidator.js";

const router = Router();
const productManager = new ProductManager("./src/data/products.json");

router.get("/", async (req, res, next) => {
  try {
    let limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = await productManager.getProducts(limit);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

router.post("/", productValidator, async (req, res, next) => {
  try {
    const product = await productManager.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productManager.getProductById(id);
    if (!product) {
      return res.status(404).json({ msg: "product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const productUpd = await productManager.updateProduct(req.body, id);
    if (!productUpd) res.status(404).json({ msg: "Error updating product" });
    res.status(200).json(productUpd);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const delProduct = await productManager.deleteProduct(id);
    if (!delProduct) res.status(404).json({ msg: "Error delete product" });
    res.status(200).json({ msg: `Product id: ${id} deleted` });
  } catch (error) {
    next(error);
  }
});

export default router;
