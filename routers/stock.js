const express = require("express")
const router = express.Router()
const {getStockLevels} = require("../controller/stock.js")
const {authorize} = require("../middleware/authorize.js")
const {authMiddleware} = require("../middleware/authenticate.js")


router.get("/",authMiddleware,authorize("Manager"),getStockLevels)


module.exports = {router}