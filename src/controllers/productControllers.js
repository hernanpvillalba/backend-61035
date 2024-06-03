import * as service from "../services/productServices.js";

export const getAll = async (req, res, next) =>{
    try{
        const response = await service.getAll()
        res.json(response)
    } catch(error){
        next (error.message)
    }
}

export const getById = async (req, res, next) =>{
    try{
        const {id} = req.params
        const product = await service.getById(id)
        if (!product) res.status(404).json({msg: 'Product not found'})
            else res.json(product)
    } catch(error){
        next (error.message)
    }
}

export const create = async (req, res, next) =>{
    try{
        const newProduct = await service.create(req.body)
        if(!newProduct) res.status(404).json ({msg: 'Error creating product'})
            else res.json(newProduct)
    } catch(error){
        next (error.message)
    }
}

export const update = async (req, res, next) =>{
    try{
        const {id} = req.params
        const productUpdate = await service.update(id,req.body)
        if (!productUpdate) res.status(404).json ({msg: 'Error updating product'})
            else res.json(productUpdate)
    } catch(error){
        next (error.message)
    }
}

export const remove = async (req, res, next) =>{
    try{
        const {id} = req.params
        const productDelete = await service.remove(id)
        if (!productDelete) res.status(404).json ({msg: 'Error remove product'})
            else res.json(productDelete)
    } catch(error){
        next (error.message)
    }
}