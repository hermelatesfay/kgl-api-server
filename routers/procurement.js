const express = require("express");
const { procurementModel } = require("../models/procurement.js");
const {createProcurement,getProcurement,updateProcurementByID,deleteProcurementByID} = require("../controller/procurement.js")
const {authorize,authMiddleware} = require("../middleware/user.js")

const router = express.Router();

/**
 * @swagger * /procurement:
 *   post:
 *    summary: Create a new procurement record
 * tags: [Procurement]
 * requestBody:
 *  required: true
 * content:
 * application/json:
 *  schema:
 * type: object
 * properties:
 * supplierName:
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
 * responses:
 *  201:
 * description: Procurement record created successfully
 *  400:
 * description: Bad request - error creating procurement record
 */
router.post("/",authMiddleware,authorize("Manager"),createProcurement);


router.get("/", getProcurement);



router.patch("/:id", updateProcurementByID);



router.delete("/:id",deleteProcurementByID);

module.exports = { router };
