import express from "express";

import { products } from "./products.js";

const app = express ();

app.get('/products', (req, res) =>{
    res.json(products)
    console.log(req);
})

app.get('/productsFilter', (req, res) =>{
    const {value} = req.query
    console.log(value);
    const productsFilter = products.filter(p=>p.price > parseInt(value))
    res.json(productsFilter)
})

app.get('/product/:id', (req, res) =>{
    const {id} = req.params;
    console.log(id);
    const prod = products.find(p=> p.id === parseInt(id))
    if(!prod) res.json({msg:'Product not found'})
    else res.json(prod)
})


const PORT = 8081

app.listen(PORT, ()=>console.log(`Server OK en puerto ${PORT} `));