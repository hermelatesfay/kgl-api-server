const {stockModel} = require("../../models/stock.js")
const { Sale, cashSale, CreditSale } = require("../../models/sales.js");

const getAgentStock = async (req, res) => {
  try {
    const branch = req.user.branch;

    const stock = await stockModel
      .find({ branch })
      .populate("product", "name");

    return res.json(stock);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const getAgentSales = async (req, res) => {
  try {
    const sales = await Sale
      .find({ createdBy: req.user.id })
      .sort({ createdAt: -1 })
      .populate("product", "name");

    return res.json(sales);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const getAgentDailySales = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dailySales = await Sale.find({
      createdBy: req.user.id,
      createdAt: { $gte: today, $lt: tomorrow }
    }).populate("product", "name");

    return res.json(dailySales);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const getAgentCreditSales = async (req, res) => {
  try {
    const creditSales = await Sale.find({
      createdBy: req.user.id,
      saleType: "CreditSale"
    }).populate("product", "name");

    return res.json(creditSales);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const getAgentCashSummary = async (req, res) => {
  try {
    const agentId = req.user.id;

    const totalCash = await Sale.aggregate([
      {
        $match: {
          createdBy: agentId,
          saleType: "cashSale"
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amountPaid" }
        }
      }
    ]);

    const totalCreditOutstanding = await Sale.aggregate([
      {
        $match: {
          createdBy: agentId,
          saleType: "CreditSale"
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amountDue" }
        }
      }
    ]);

    return res.json({
      totalCashCollected: totalCash[0]?.total || 0,
      totalCreditOutstanding: totalCreditOutstanding[0]?.total || 0
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


module.exports = {getAgentStock,getAgentSales,getAgentDailySales,getAgentCreditSales,getAgentCashSummary}