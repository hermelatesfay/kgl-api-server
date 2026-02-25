const { Sale, cashSale, CreditSale } = require("../models/sales.js");

//Model map
const saleModels = {
  cashSale,
  CreditSale
};

const createSale = async (req, res) => {
  try {
    const { saleType } = req.body;

    const Model = saleModels[saleType];

    if (!Model) {
      return res.status(400).json({ message: "Invalid sale type" });
    }

    const sale = await Model.create({
      ...req.body,
      salesAgent: req.user.id
    });

    return res.status(201).json({
      message: "Sale created successfully",
      sale
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error creating sale",
      error: error.message
    });
  }
};


const getSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    if (!sales) {
      return res.json({ message: "Sales not found" }).status(400);
    }
    return res.status(200).json({ message: "sales found successfully", sales });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}


const updateSale = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    let updateSale = await Sale.findByIdAndUpdate(id, body, { new: true });
    if (updateSale) {
      return res.status(200).json({ message: "Updated successfully", updateSale });
    } else {
      return res.status(400).json({ message: "Failed to update sale" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Failed to update sale", err });
  }
}



const deleteSale = async (req, res) => {
  try {
    const id = req.params.id;

    let deleteSales = await Sale.findByIdAndDelete(id);

    if (deleteSales) {
      return res.status(200).json({ message: "Sales deleted successfully", deleteSales });
    } else {
      return res.status(400).json({ message: "Failed to delete sales" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Failed to delete sales", err });
  }
}

module.exports = {createSale,getSales,updateSale,deleteSale}