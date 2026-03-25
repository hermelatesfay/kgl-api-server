const express = require("express");
const { Sale, cashSale, CreditSale } = require("../models/sales.js");
const router = express.Router();
const {createSale,getSales,updateSale,deleteSale,recordCreditPayment,cancelSale,getSalesByDate} = require("../controller/sales.js")
const {authorize} = require("../middleware/authorize.js")
const {authMiddleware} = require("../middleware/authenticate.js")


/**
 * @swagger * /sales:
 *   post:
 *    summary: Create a new sale record
 * tags: [Sales]
 * requestBody:
 *  required: true
 * content:
 * application/json:
 *  schema:
 * type: object
 * properties:
 * customerName:
 * type: string
 * date:
 * type: string
 * time:
 * type: string
 * tonnage:
 * type: number
 * cost:
 * type: number
 * dealerName:
 * type: string
 * branch:
 * type: string
 * contact:
 * type: string
 * sellingPrice:
 * type: number
 * paymentMethod:
 * type: string
 * responses:
 *  201:
 * description: Sale record created successfully
 *  400:
 * description: Bad request - error creating sale record
 */
router.post("/", authMiddleware,authorize("Manager","Sales agent"),createSale);



router.get("/", getSales);



router.patch("/:id", updateSale);



router.delete("/:id", deleteSale);

router.patch("/:id/cancel",cancelSale)


router.post("/:id/payment",authMiddleware,authorize("Manager"),recordCreditPayment)

router.get("/startDate=2026-01-01&endDate=2026-01-31",getSalesByDate)

module.exports = { router };
