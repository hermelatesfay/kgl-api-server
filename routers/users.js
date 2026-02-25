const express = require("express")
const router = express.Router()
const {userModel} = require("../models/users.js")
const {getUser,updateUser,deleteUser} = require("../controller/users.js")


/**
 * @swagger
 * /users:
 *   get:
 *  summary: Retrieve a list of users
 * tags: [Users]
 * responses:
 *  200:
 * description: A list of users
 *  400:
 * description: Bad request - error retrieving users
 *  401:
 * description: Unauthorized - missing or invalid token
 *  403:
 * description: Forbidden - insufficient permissions
 *      
 */
router.get("/",getUser)


/**
 * @swagger
 * /users/{id}:
 *   patch:
 *   summary: Update a user by ID
 * tags: [Users]
 * requestBody:
 *  required: true
 * content:
 *  application/json:
 *   schema:
 *  type: object
 * properties:
 * username:
 * type: string
 * password:
 * type: string
 * role:
 * type: string
 * responses:
 *  200:
 * description: User updated successfully
 * 400:
 * description: Bad request - error updating user
 */
router.patch("/:id",updateUser)



router.delete("/:id",deleteUser)




module.exports = {router}
