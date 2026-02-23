const express = require("express")
const {userModel} = require("../models/users.js")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


router.post("/login",async(req,res)=>{
    const {username,password} = req.body

    let _user = await userModel.findOne({username})

    if(!_user){
        res.status(401).json({message:"Can't find user with provided email and password"})
    }

    let isPasswordCorrect = await bcrypt.compare(password, _user.password)

    if(_user && isPasswordCorrect){
        let user = {
            username: _user.username,
            role: _user.role,
            sub: _user._id
        }

        let token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: "1h"})

        res.status(200).json({message:"Login successful",token})
    }else{
        res.status(401).json({message:"Invalid credentials"})
    }
})


router.post("/register",async(req,res)=>{
    try{
        let body = req.body

        let password = await bcrypt.hash(body.password, 10)

        body.password = password

        let newUser = new userModel(body)
        await newUser.save()
        res.status(201).json({message:"User created successfully",newUser})
    }catch(err){
        res.status(404).json({message:"Failed to create users"})
    }
})



module.exports = {router}