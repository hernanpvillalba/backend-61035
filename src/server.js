import express from "express";
import ProductManager from "./manager/product.manager.js";

const productManager = new ProductManager('/products.json');

const app = express ();

app.use(express.json());

app.get ('/products', async(req, res)=>{
    try{
        let limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = await productManager.getProducts();
        res.status(200).json(products)
    }catch (error){
        res.status(500).json({msg: error.message})
    } 
})

app.post('/products', async(req, res)=>{
    try{
        const product = await productManager.createProduct(req.body);
        res.status(201).json(product);        
    }catch (error){
        res.status(500).json({msg: error.message})
    }
})

app.get('/products/:id', async(req, res)=>{
    try{
            const {id} = req.params;
            const product = await productManager.getProductById(id);
            if(!product) res.status(404).json({msg: 'product not found'})
            else res.status(200).json(product)
    }catch (error){
        res.status(500).json({msg: error.message})
    }
})

app.put('/products/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const productUpd = await productManager.updateProduct(req.body, id);
        if (!productUpd) res.status(404).json({msg: 'Error updating product'})
        res.status(200).json(productUpd)
    }catch (error){
        res.status(500).json({msg: error.message})
    }
})

app.delete('/products/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const delProduct = await productManager.deleteProduct(id); 
        if(!delProduct) res.status(404).json({msg: 'Error delete product'})
        res.status(200).json({msg: `Product id: ${id} deleted`})
    }catch (error){
        res.status(500).json({msg: error.message})
    }
})

const PORT = 8080;

app.listen(PORT, ()=> console.log(`Server OK en el puerto ${PORT}`));
