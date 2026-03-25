const {stockModel} = require("../models/stock.js")

const getStockLevels = async (req, res) => {
  try {

    const stocks = await stockModel.find()
      .populate("product", "name category")
      .select("remainingStock capacity branch product");

    res.json(stocks);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {getStockLevels}