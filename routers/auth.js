const express = require("express")
const {userModel} = require("../models/users.js")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

/**
 * @swagger
 * /auth/login:
 *   post:
 *   summary: Login a user
 * tags: [Auth]
 * requestBody:
 *  required: true
 * content:
 *  application/json:
 *   schema:
 *  type: object
 *  properties:
 * username:
 * type: string
 * password:
 * type: string
 * responses:
 *  200:
 * description: Login successful
 *  401:
 * description: Invalid credentials
 *  404:
 * description: User not found
 */
router.post("/login",async(req,res)=>{
    const {username,password} = req.body

    let _user = await userModel.findOne({username})

    if(!_user){
        return res.status(401).json({message:"Can't find user with provided username and password"})
    }

    let isPasswordCorrect = await bcrypt.compare(password, _user.password)

    if(_user && isPasswordCorrect){
        let user = {
            username: _user.username,
            role: _user.role,
            sub: _user._id
        }

        let token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: "1h"})

        return res.status(200).json({message:"Login successful",token,user})
    }else{
        return res.status(401).json({message:"Invalid username or password"})
    }
})


/**
 * @swagger
 * /auth/register:
 *   post:
 *    summary: Register a new user
 * tags: [Auth]
 * requestBody:
 *  required: true
 * content:
 *  application/json:
 *   schema:
 *   type: object
 *  properties:
 * username:
 * type: string
 * password:
 * type: string
 * role:
 * type: string
 * responses:
 *  201:
 * description: User created successfully
 * 400:
 *  description: Bad request - error creating user
 */
router.post("/register",async(req,res)=>{
    try{
        let body = req.body

        let password = await bcrypt.hash(body.password, 10)

        body.password = password

        let newUser = new userModel(body)
        await newUser.save()
        return res.status(201).json({message:"User created successfully",newUser})
    }catch(err){
        return res.status(404).json({message:"Failed to create users"})
    }
})



module.exports = {router}