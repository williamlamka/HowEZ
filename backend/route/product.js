import express from"express";
import Product from "../model/product.js";

const router = express.Router();

router.get("/", async function(req, res){
    try{
        const products = await Product.find();
        res.status(200).json(products);
    }catch(err){
        res.status(500).json(err);
    }
})

router.get("/:id", async function(req, res){
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
})

router.post("/", async function(req, res){
    try{
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(200).json("success");
    }catch(err){
        res.status(500).json(err)
    }
})

export default router;