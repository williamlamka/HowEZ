import express from "express";
import User from "../model/user.js";
import Product from "../model/product.js"
import {verifyUser} from "../jwt/verifyJWT.js";

const router = express.Router();

//get cart
router.get("/cart", verifyUser, async function(req, res){
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.json({
                success: false,
                detail: "User not found"
            });
        }
        if (user.cart.length === 0) {
            return res.json({
                success: true,
                detail: "No product in Cart!"
            });
        }
        const cartList = await Promise.all(user.cart.map(async(item) => {
            return await Product.findById(item);
        }));
        res.json({
            success: true,
            detail: cartList
        });
    } catch (err) {
        console.error(err);
        res.json({
            success: false,
            detail: "Something went wrong"
        });
    }
});

//get user
router.get("/:id", verifyUser, async function(req, res){
    try{
        const user = await User.findById(req.params.id);
        if(user){
            res.status(200).json(user);
        }else{
            res.status(200).send("user not exist");
        }
    }catch(err){
        res.status(500)
    }
});

//update cart
router.post("/cart", verifyUser, async function(req, res){
    try{
        await User.findByIdAndUpdate(req.user.id, 
            { "$push": { "cart": req.body.product_id } },
            { "new": true, "upsert": true },       
        ); 
        res.json({
            "add": true
        });
    }catch(err){
        res.json({
            "add": false
        })
    }
});

router.post("/cart/delete", verifyUser, async function(req, res){
    try{
        await User.findByIdAndUpdate(req.user.id, 
            { "$pull": { cart:  {$eq: req.body.id }}},
        ); 
        res.json({
            "delete": true
        });
    }catch(err){
        console.log(err);
        res.json({
            "delete": false
        });
    }
});

//update profile
router.post("/:id", verifyUser, async function(req, res){
    try{
        const user = await User.findByIdAndUpdate(
            req.params.id, 
            {$set: { ...req.body}},
            {new: true}
        );
        res.status(200).json({detail: "Update successful!"});
    }catch(err){
        res.status(200).json({detail: "Error updating the user"});
    }
});



export default router;