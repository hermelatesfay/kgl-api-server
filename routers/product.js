const express = require("express")
const router = express.Router()
const {createProduct, getProducts, updateProduct, deleteProduct} = require("../controller/product.js")
const {authorize} = require("../middleware/authorize.js")
const {authMiddleware} = require("../middleware/authenticate.js")
const {productModel} = require("../models/product.js")

//Create product
router.post("/",authMiddleware,authorize("Manager"),createProduct)


//Get all products
router.get("/",authMiddleware,authorize("Manager"),getProducts)

//Update product
router.patch("/:id",authMiddleware,authorize("Manager"),updateProduct)


//Delete product
router.delete("/:id", authMiddleware,authorize("Manager"),deleteProduct)

module.exports = {router}