import * as service from "../services/cartServices.js"

export const getAll = async (req, res, next) =>{
    try{
        const response = await service.getAll();
        res.status(200).json(response);
    }catch (error) {
        next(error.message);
      }
}

export const getById = async (req, res, next) =>{
    try{
        const { idCart } = req.params;
        const response = await service.getById(idCart);
        if (!response) res.status(404).json({ msg: "Cart Not found!" });
        else res.status(200).json(response);
    }catch (error) {
        next(error.message);
      }
}

export const create = async (req, res, next) =>{
    try{
        const newCart = await service.create();
        if (!newCart) res.status(404).json({ msg: "Error creating cart" });
        else res.status(200).json(newCart);
    }catch (error) {
        next(error.message);
      }
}

export const update = async (req, res, next) =>{
    try{
        const { idCart } = req.params;
        const cartUpd = await service.update(idCart, req.body);
        if (!cartUpd) res.status(404).json({ msg: "Error updating cart" });
        else res.status(200).json(cartUpd);
    }catch (error) {
        next(error.message);
      }
}

export const remove = async (req, res, next) =>{
    try{
        const { idCart } = req.params;
        const cartDel = await service.remove(idCart);
        if (!cartDel) res.status(404).json({ msg: "Error deleting cart" });
        else res.status(200).json({ msg: `Cart id: ${idCart} deleted` });
    }catch (error) {
        next(error.message);
      }
}

export const addProdToCart = async (req, res, next) =>{
    try{
        const {idCart} = req.params;
        const {idProd} = req.params;
        const newProdToUserCart = await service.addProdToCart(
            idCart,
            idProd,
        );
        if (!newProdToUserCart) res.json({msg: "Product or Cart not exist"});
        else res.json(newProdToUserCart);
    }catch (error) {
        next(error.message);
      }
}

export const removeProdToCart = async (req, res, next) =>{
    try{
        const {idCart} = req.params;
        const {idProd} = req.params;
        const delProdToUserCart = await service.removeProdToCart(
            idCart,
            idProd,
        );
        if(!delProdToUserCart) res.json9({msg: "Error removing product from cart"});
        else res.json({msg: `product ${idProd} deleted from cart`});
    } catch (error) {
        next(error.message);
      }
}

export const updateProdQuantityToCart = async (req, res, next) =>{
    try{
        const {idCart} = req.params;
        const {idProd} = req.params;
        const {quantity} = req.body;
        const updateProdQuantity = await service.updateProdQuantityToCart(
            idCart,
            idProd,
            quantity
        )
        if(!updateProdQuantity) res.json({msg: "Error updating product from cart"});
        else res.json (updateProdQuantity);
    }catch (error) {
        next(error.message);
      }
}

export const clearCart = async(req, res, next) =>{
    try{
        const {idCart} = req.params;
        const clearCart = await service.clearCart(
            idCart,
        );
        if(!clearCart) res.json ({msg:"Error clearing cart"});
        else res.json (clearCart);
    }catch (error) {
        next(error.message);
      }
}