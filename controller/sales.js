const { Sale, cashSale, CreditSale } = require("../models/sales.js");
const {procurementModel} = require("../models/procurement.js")
const {stockModel} = require("../models/stock.js")
const {productModel} = require("../models/product.js")


//Model map
const saleModels = {
  cashSale,
  CreditSale
};

const createSale = async (req, res) => {
  try {
    
    const { product, tonnage, branch,saleType,...rest} = req.body;

    const quantity = Number(tonnage);

    if(isNaN(quantity) || quantity < 1000){
      return res.status(400).json({message: "Tonnage must be a number and at least 1000 kg"})
    }

    const productExists = await productModel.findById(product);

    if(!productExists){
    return res.status(400).json({
      message: "Product does not exist"
    });
    }

    //Find stock
    const stock = await stockModel.findOne({product, branch})

    if(!stock){
      return res.status(400).json({message: "Stock not found"})
    }

    //Check availability
    if(stock.remainingStock < quantity){
      return res.status(400).json({message: "Insufficient stock"})
    }

    //Create sale record
    const Model = saleModels[saleType];

    if (!Model) {
      return res.status(400).json({ message: "Invalid sale type" });
    }

    if(saleType === "CreditSale"){

  if(rest.amountPaid === 0){
    rest.paymentStatus = "Unpaid"
  }
  else if(rest.amountPaid < rest.totalAmount){
    rest.paymentStatus = "Partial"
  }
  else{
    rest.paymentStatus = "Paid"
  }

}

    const sale = await Model.create({
        product,
        tonnage,
        branch,
        createdBy: req.user.id,
        ...rest
        
    });

    //Update total
    stock.totalSold += quantity;

    //Recalculate remaining
    stock.remainingStock = stock.totalProcured - stock.totalSold;
    
    await stock.save();

    return res.status(201).json({
      message: "Sale created successfully",
      sale,stock
    });

  } catch (error) {
    return res.status(500).json({
      message:  error.message
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


const cancelSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);

    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    if (sale.status === "Cancelled") {
      return res.status(400).json({ message: "Sale already cancelled" });
    }

    // Restore stock
    const stock = await stockModel.findOne({
      product: sale.product,
      branch: sale.branch
    });

    stock.remainingStock += sale.tonnage;
    stock.totalSold -= sale.tonnage;

    await stock.save();

    sale.status = "Cancelled";
    await sale.save();

    return res.json({ message: "Sale cancelled successfully" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const recordCreditPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { totalAmount } = req.body;

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({
        message: "Invalid payment amount"
      });
    }

    const sale = await Sale.findById(id);

    if (!sale) {
      return res.status(404).json({
        message: "Sale not found"
      });
    }

    if (sale.saleType !== "CreditSale") {
      return res.status(400).json({
        message: "Payments can only be recorded for credit sales"
      });
    }

    if (sale.amountDue <= 0) {
      return res.status(400).json({
        message: "This credit sale is already fully paid"
      });
    }

    if (totalAmount > sale.amountDue) {
      return res.status(400).json({
        message: "Payment exceeds remaining balance"
      });
    }

    // Update financial values
    sale.amountPaid += totalAmount;
    sale.amountDue -= totalAmount;

    // Update status
    if (sale.amountDue === 0) {
      sale.paymentStatus = "Paid";
    } else {
      sale.paymentStatus = "Partial";
    }

    await sale.save();

    return res.status(200).json({
      message: "Payment recorded successfully",
      sale
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};


const getSalesByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let filter = {};

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const sales = await Sale.find(filter);

    return res.json(sales);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



module.exports = {createSale,getSales,updateSale,deleteSale,recordCreditPayment,cancelSale,getSalesByDate}