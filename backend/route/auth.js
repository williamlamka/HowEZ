import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import { verifyToken } from "../jwt/verifyJWT.js";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    scope: ["email", "profile"]
},
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ email: profile.emails[0].value }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                const newUser = new User({
                    email: profile.emails[0].value,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName
                });
                newUser.save();
                return done(null, newUser);
            } else {
                console.log("have");
                return done(null, user);
            }
        });
    }
));

router.post("/register", async function (req, res) {
    try {
        User.findOne({ email: req.body.email }, async function (err, user) {
            if (err) {
                res.json({
                    registered: false,
                    detail: "Error!"
                });
            } else {
                if (user) {
                    res.json({
                        registered: false,
                        detail: "Email is used!"
                    });
                } else {
                    if (req.body.password !== req.body.confirmPassword) {
                        res.json({
                            registered: false,
                            detail: "Password is not the same!"
                        });
                    } else {
                        const salt = bcrypt.genSaltSync(10);
                        const hash = bcrypt.hashSync(req.body.password, salt);
                        const newUser = new User({
                            ...req.body,
                            password: hash,
                        });

                        await newUser.save();
                        res.json({ registered: true });
                    }
                }
            }
        });
    }
    catch (err) {
        res.json({ registered: false });
    }
});

router.post("/login", async function (req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            res.json({
                auth: false,
                detail: "User donesn't exist"
            });

        const isPasswordCorrect = await bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordCorrect) {
            res.json({
                auth: false,
                detail: "The password is incorrect. Try again."
            });
        }

        const token = jwt.sign({ id: user._id, name: user.firstName }, process.env.JWT);
        res.cookie("access_token", token, { httpOnly: true });
        res.json({
            "auth": true,
            "name": user.firstName,
            "id": user._id
        });
    }
    catch (err) {
    }
});

router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }, { session: false }));

router.get("/google/redirect", passport.authenticate("google", { session: false }), function(req, res){
    if(req.user){
        const token = jwt.sign({ id: req.user._id, name: req.user.firstName }, process.env.JWT);
        res.cookie("access_token", token, { httpOnly: true });
        res.redirect("http://localhost:3000");
    }else{
        res.redirect("http://localhost:3000/login");
    }
});

//for refresh
router.get("/verifyLogin", verifyToken, function (req, res) {
    if (req.user) {
        res.json({
            "auth": true,
            "id": req.user.id,
            "name": req.user.name
        });
    }
});

router.get("/logout", function (req, res) {
    res.status(200).clearCookie("access_token");
    res.end();
});

export default router;