const express = require("express");
const { procurementModel } = require("../models/procurement.js");
const {createProcurement,getProcurement,updateProcurementByID,deleteProcurementByID} = require("../controller/procurement.js")
const {authorize,authMiddleware} = require("../middleware/user.js")

const router = express.Router();

/** * @swagger * /procurement:
 *   post:
 *     summary: Create a new procurement record
 *   security:
 *     - bearerAuth: [] 
 *    requestBody:
 *     required: true
 *    content:
 *      application/json:
 *       schema:
 *        type: object
 *       properties:
 *        item:
 *        type: string
 *        quantity:
 *        type: number
 *   responses:
 *    201:
 *     description: Procurement record created successfully
 *  403:
 *    description: Unauthorized - insufficient permissions
 * 
 */
router.post("/",authMiddleware,authorize("Manager"),createProcurement);

/**
 * @swagger * /procurement:
 *   get:
 *     summary: Retrieve a list of procurement records
 *  tags: [Procurement]
 * responses:
 *  200:
 *   description: Procurement records retrieved successfully
 *  400:
 *  description: Bad request - error retrieving procurement records
 */
router.get("/", getProcurement);


/**
 * @swagger * /procurement/{id}:
 *   patch:
 *    summary: Update a procurement record by ID
 * tags: [Procurement]
 * responses:
 *  200:
 *   description: Procurement record updated successfully
 *  400:
 *  description: Bad request - error updating procurement record
 */
router.patch("/:id", updateProcurementByID);


/**
 * @swagger * /procurement/{id}:
 *   delete:
 *    summary: Delete a procurement record by ID
 * tags: [Procurement]
 * responses:
 *  200:
 *   description: Procurement record deleted successfully
 *  400:
 *  description: Bad request - error deleting procurement record
 */
router.delete("/:id",deleteProcurementByID);

module.exports = { router };
