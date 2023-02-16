import express from "express";
import User from "../model/user.js";
import Product from "../model/product.js"
import { verifyUser } from "../jwt/verifyJWT.js";
import { transporter } from "../nodemailer/transporter.js";

const router = express.Router();

//get product from cart
router.get("/cart", verifyUser, async function (req, res) {
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
        const cartList = await Promise.all(user.cart.map(async (item) => {
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

//get total price from cart
router.get("/price", verifyUser, async function (req, res) {
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
        const cartList = await Promise.all(user.cart.map(async (item) => {
            return await Product.findById(item);
        }));

        let price = 0;
        cartList.map((item) => {
            price = item.price + price;
        })
        res.json({
            success: true,
            total_price: price
        });
    } catch (err) {
        console.error(err);
        res.json({
            success: false,
            detail: "Something went wrong"
        });
    }
});

//get order
router.get("/order", verifyUser, async function (req, res) {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.json({
                success: false,
                detail: "User not found"
            });
        }
        if (user.order.length === 0) {
            return res.json({
                success: true,
                detail: "No Order!"
            });
        }
        const orderList = await Promise.all(user.order.map(async (item) => {
            return item
        }));
        res.json({
            success: true,
            detail: orderList
        });
    } catch (err) {
        console.error(err);
        res.json({
            success: false,
            detail: "Something went wrong"
        });
    }
});

//get user with id
router.get("/:id", async function (req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(400).send("user not exist");
        }
    } catch (err) {
        res.status(500)
    }
});

//get order with id
router.get("/order/:id", verifyUser, async function (req, res) {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.json({
                success: false,
                detail: "User not found"
            });
        }
        if (user.order.length === 0) {
            return res.json({
                success: true,
                detail: "Order nor found"
            });
        }
        let orderList = user.order.map((item) => {
            if (item._id.toString() === req.params.id) {
                return item;
            }
        });
        orderList = orderList.filter(function (element) {
            return element !== undefined;
        });
        const productList = await Promise.all(orderList[0].products.map(async (item) => {
            return await Product.findById(item);
        }));
        res.json({
            success: true,
            order: orderList,
            product: productList
        });
    } catch (err) {
        console.error(err);
        res.json({
            success: false,
            detail: "Something went wrong"
        });
    }
});

//update cart
router.post("/cart", verifyUser, async function (req, res) {
    try {
        await User.findByIdAndUpdate(req.user.id,
            { "$push": { "cart": req.body.product_id } },
            { "new": true, "upsert": true },
        );
        res.json({
            "add": true
        });
    } catch (err) {
        res.json({
            "add": false
        })
    }
});

//delete cart items
router.post("/cart/delete", verifyUser, async function (req, res) {
    try {
        await User.findByIdAndUpdate(req.user.id,
            { "$pull": { cart: { $eq: req.body.id } } },
        );
        res.json({
            "delete": true
        });
    } catch (err) {
        res.json({
            "delete": false
        });
    }
});

//update order
router.post("/order", verifyUser, async function (req, res) {
    try {
        const date = new Date();
        await User.findByIdAndUpdate(req.user.id,
            {
                "$push": {
                    "order": {
                        products: req.body.products,
                        price: req.body.price,
                        orderDate: date
                    }
                }
            },
            { "new": true, "upsert": true },
        );
        await User.findByIdAndUpdate(req.user.id,
            { "$set": { cart: [] } },
        );

        const user = await User.findById(req.user.id);
        const mailContent = `
            <h3>Your order is successful created</h3>
            <h3>Thank you for using HowEZ!</h3>
        `
        await transporter.sendMail({
            from: '"HowEZ" <noreply@HowEZ.com>', // sender address
            to: user.email, // list of receivers
            subject: "Confirmation Email of your order", // Subject line
            html: mailContent, // html body
        })

        res.json({
            "add": true,
            "delete": true
        });
    } catch (err) {
        res.json({
            "add": false
        })
    }
});

//update profile
router.post("/:id", verifyUser, async function (req, res) {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: { ...req.body } },
            { new: true }
        );
        res.status(200).json({ detail: "Update successful!" });
    } catch (err) {
        res.status(200).json({ detail: "Error updating the user" });
    }
});



export default router;