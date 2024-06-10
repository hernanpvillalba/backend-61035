import * as service from "../services/productServices.js";

export const getAll = async (req, res, next) => {
  try {
    const {page, limit, name, sort} = req.query;
    const response = await service.getAll(page, limit, name, sort);
    const next = response.hasNextPage ? `http://localhost:8080/products?page=${response.nextPage}`:null;
    const prev = response.hasPrevPage ? `http://localhost:8080/products?page=${response.prevPage}`:null;
    res.json({
      payload: response.docs,
      info:{
        count:response.totalDocs,
        totalPages:response.totalPages,
        nextLink:next,
        prevLink:prev,
        hasPrevPage:response.hasPrevPage,
        hasNextPage:response.hasNextPage
      }
    });
    res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prod = await service.getById(id);
    if (!prod) res.status(404).json({ msg: "Product not found" });
    else res.json(prod);
  } catch (error) {
    next(error.message);
  }
};

export const create = async (req, res, next) => {
  try {
    const newProduct = await service.create(req.body);
    if (!newProduct) res.status(404).json({ msg: "Error creating product" });
    else res.json(newProduct);
  } catch (error) {
    next(error.message);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productUpdate = await service.update(id, req.body);
    if (!productUpdate) res.status(404).json({ msg: "Error updating product" });
    else res.json(productUpdate);
  } catch (error) {
    next(error.message);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productDelete = await service.remove(id);
    if (!productDelete) res.status(404).json({ msg: "Error remove product" });
    else res.json(productDelete);
  } catch (error) {
    next(error.message);
  }
};
