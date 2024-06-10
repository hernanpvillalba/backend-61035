import { CartModel } from "./models/cartModel";

export default class CartDaoMongoDB{
    async create(){
        try{
            return await CartModel.create({
                products:[],
            });
        }catch (error) {
            throw new Error(error);
        }
    }
    
    async getAll(){
        try{
            return await CartModel.find({});
        }catch (error) {
            throw new Error(error);
        }
    }

    async getById(id){
        try{
            return await CartModel.findById(id).populate("products.product")
        }catch (error) {
            throw new Error(error);
        }
    }

    async delete(id){
        try{
            return await CartModel.findByIdAndDelete(id)
        }catch (error) {
            throw new Error(error);
        }
    }

    async addProductToCart(cartId, prodId, quantity){
        try{
            const cart = await CartModel.findById(cartId);
            if(!cart) return null;
            const existProdIndex = cart.products.findIndex(p => p.product.toString() === prodId);
            if(existProdIndex !== -1){
                cart.products[existProdIndex].quantity = quantity;
            } else cart.products.push({product: prodId, quantity});
            await cart.save()
            return cart
        }catch (error) {
            throw new Error(error);
        }
    }

    async existProdInCart(cartId, prodId){
        try{
            return await CartModel.findOne({
                _id:cartId,
                products:{$elemMatch: {prod:prodId}}
            })
        }catch (error) {
            throw new Error(error);
        }
    }

    async removeProdToCart(cartId, prodId){
        try{
            const cart = await CartModel.findOneAndUpdate(
                {_id:cartId},
                {$pull: {products: {product:prodId}}},
                {new:true}
            )
        }catch (error) {
            throw new Error(error);
        }
    }

    async update(id, obj){
        try{
            const response = await CartModel.findByIdAndUpdate(id, obj, {
                new:true,
            });
            return response
        }catch (error) {
            throw new Error(error);
        }
    }

    async updateProdQuantityToCart (cartId, prodId, quantity){
        try{
            return await CartModel.findOneAndUpdate(
                {_id:cartId, 'products.product':prodId},
                {$set: {'products.$.quantity':quantity}},
                {new:true}
            )
        }catch (error) {
            throw new Error(error);
        }
    }

    async clearCart (cartId){
        try{
            return await CartModel.findByIdAndUpdate(
                cartId, 
                {$set: {products:[]}},
                {new:true}
            )
        }catch (error) {
            throw new Error(error);
        }
    }
}