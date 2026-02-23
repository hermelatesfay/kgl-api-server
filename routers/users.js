const express = require("express")
const router = express.Router()
const {userModel} = require("../models/users.js")
const {getUser,updateUser,deleteUser} = require("../controller/users.js")

/**
 * @swagger
 * /users:
 *   get:
 *    summary: Retrieve a list of users
 * tags: [Users]
 * responses:
 *  200:
 *  description: Users retrieved successfully
 * 400:
 * description: Bad request - error retrieving users
 */
router.get("/",getUser)


/**
 * @swagger
 * /users/{id}:
 *   patch:
 *    summary: Update a user by ID
 * tags: [Users]
 * responses:
 *  200:
 *   description: User updated successfully
 *  400:
 *  description: Bad request - error updating user
 */
router.patch("/:id",updateUser)


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *    summary: Delete a user by ID
 * tags: [Users]
 * responses:
 *  200:
 *   description: User deleted successfully
 *  400:
 *  description: Bad request - error deleting user
 */
router.delete("/:id",deleteUser)




module.exports = {router}
