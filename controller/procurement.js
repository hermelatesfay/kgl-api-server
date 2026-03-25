const {procurementModel} = require("../models/procurement.js")
const {stockModel} = require("../models/stock.js")

const createProcurement = async (req, res) => {
  try {

    const {product, branch, tonnage} = req.body;

    const quantity = Number(tonnage);

    if(isNaN(quantity) || quantity < 1000){
      return res.status(400).json({message: "Tonnage must be a number and at least 1000 kg"})
    }

    const procurement = await procurementModel.create({
      ...req.body
    });

    //Find stock
    let stock = await stockModel.findOne({product, branch})

    if(!stock){
      //if no stock exists, create one
      stock = new stockModel({
        product,
        branch,
        totalProcured: quantity,
        totalSold: 0,
        remainingStock: quantity
      })
    }else{
      //Update existing stock
      stock.totalProcured += quantity;
      stock.remainingStock = stock.totalProcured - stock.totalSold;
      
    }
    await stock.save();

    return res.status(201).json({
      message: "Procurement recorded successfully",
      procurement,stock
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};


const getProcurement = async (req, res) => {
  try {
    let procurement = await procurementModel.find();
    return res.json(procurement).status(200);
  } catch (err) {
    return res.json({ message: "Failed to get procurement" }).status(400);
  }
}


const updateProcurementByID = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    let updateProcurement = await procurementModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (updateProcurement) {
      return res.json({ message: "Update Successful", updateProcurement }).status(200);
    } else {
      return res.json({ message: "Failed to update procurement" }).status(400);
    }
  } catch (err) {
    return res.json({ message: "Failed to update procurement", err }).status(400);
  }
}


const deleteProcurementByID = async (req, res) => {
  try {
    const id = req.params.id;

    let deleteProcurement = await procurementModel.findByIdAndDelete(id);

    if (deleteProcurement) {
      return res.json({ message: "Procurement deleted successfully" }).status(200);
    } else {
      return res.json({ message: "Failed to delete procurement" }).status(400);
    }
  } catch (error) {
    return res.json({ message: "Failed to delete procurement", error }).status(400);
  }
}

module.exports = {createProcurement,getProcurement,updateProcurementByID,deleteProcurementByID}