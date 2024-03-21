const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bodyParser = require("body-parser");
const {body, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = "IAmTheBestOfAll";

router.use(bodyParser.urlencoded({ extended: false }));

router.post("/createuser",
 body("email").isEmail(),
 body("name").isLength({min:5}),
 body("password").isLength({min:5}),
 async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {
        let salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password,salt);
        await User.create({
            name:req.body.name,
            password:secPassword,
            location:req.body.location,
            email:req.body.email,
        });
        res.json({success:true});
    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
});

router.post("/login",
 body("email").isEmail(),
 async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    let email = req.body.email;
    try {
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message:"Please enter valid email address!!"});
        }
        let comparePassword = await bcrypt.compare(req.body.password,user.password);
        if(!comparePassword) {
            return res.status(400).json({message:"Incorrect password!!"});
        }
        let data = {
            userData:{
                id:user.id
            }
        }
        let authToken = await jwt.sign(data,jwtSecret);
        res.status(200).json({success:true,authToken:authToken});
    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
});

module.exports = router;