const express = require("express");
const { Sale, cashSale, CreditSale } = require("../models/sales.js");
const router = express.Router();
const {createSale,getSales,updateSale,deleteSale} = require("../controller/sales.js")
const {authMiddleware, authorize} = require("../middleware/user.js")

/**
 * @swagger
 * /sales:
 *   post:
 *     summary: Create a new sale record
 *     tags: [Sales]
 *   security:
 *     - bearerAuth: [] 
 *    requestBody:
 *     required: true
 *    content:
 *      application/json:
 *       schema:
 *        type: object
 *       properties:
 *        saleType:
 *        type: string
 *       enum: [CashSale, CreditSale]
 *   responses:
 *    201:
 *     description: Sale record created successfully
 *  403:
 *    description: Unauthorized - insufficient permissions
 * 
 */

router.post("/", authMiddleware,authorize("Manager","Sales agent"),createSale);


/**
 * @swagger
 * /sales:
 *   get:
 *    summary: Retrieve a list of sales records
 *  tags: [Sales]
 * responses:
 *  200:
 *   description: Sales records retrieved successfully
 *  400:
 *  description: Bad request - error retrieving sales records
 * 
 */
router.get("/", getSales);


/**
 * @swagger * /sales/{id}:
 *   patch:
 *     summary: Update a sale record by ID
 *  tags: [Sales]
 * responses:
 *  200:
 *   description: Sale record updated successfully
 *  400:
 *  description: Bad request - error updating sale record
 * 
 */
router.patch("/:id", updateSale);


/**
 * @swagger * /sales/{id}:
 *   delete:
 *     summary: Delete a sale record by ID
 * tags: [Sales]
 * responses:
 *  200:
 *   description: Sale record deleted successfully
 *  400:
 * description: Bad request - error deleting sale record
 *  
 */
router.delete("/:id", deleteSale);

module.exports = { router };
