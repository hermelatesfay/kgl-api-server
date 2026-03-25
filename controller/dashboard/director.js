const { Sale, cashSale, CreditSale } = require("../../models/sales.js");
const {stockModel} = require("../../models/stock.js")
const {procurementModel} = require("../../models/procurement.js")

const getTotalSales = async (req, res) => {
  try {
    const result = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalTonnageSold: { $sum: "$tonnage" }
        }
      }
    ]);

    return res.json({
      totalSales: result[0]?.totalTonnageSold || 0
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const getBranchStock = async (req, res) => {
  try {
    const result = await stockModel.aggregate([
      {
        $group: {
          _id: "$branch",
          totalRemainingStock: { $sum: "$remainingStock" }
        }
      }
    ]);

    return res.json(result);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const getTotalRevenue = async (req, res) => {
  try {
    const result = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amountPaid" }
        }
      }
    ]);

    return res.json({
      totalRevenue: result[0]?.totalRevenue || 0
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const getTotalCreditOutstanding = async (req, res) => {
  try {
    const result = await Sale.aggregate([
      {
        $match: { saleType: "CreditSale" }
      },
      {
        $group: {
          _id: null,
          totalOutstanding: { $sum: "$amountDue" }
        }
      }
    ]);

    return res.json({
      totalCreditOutstanding: result[0]?.totalOutstanding || 0
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const getProcurementCostSummary = async (req, res) => {
  try {
    const result = await procurementModel.aggregate([
      {
        $group: {
          _id: null,
          totalProcurementCost: {
            $sum: { $multiply: ["$tonnage", "$cost"] }
          }
        }
      }
    ]);

    return res.json({
      totalProcurementCost: result[0]?.totalProcurementCost || 0
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const getProfitEstimation = async (req, res) => {
  try {
    const revenue = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amountPaid" }
        }
      }
    ]);

    const procurement = await procurementModel.aggregate([
      {
        $group: {
          _id: null,
          totalCost: {
            $sum: { $multiply: ["$tonnage", "$cost"] }
          }
        }
      }
    ]);

    const totalRevenue = revenue[0]?.totalRevenue || 0;
    const totalCost = procurement[0]?.totalCost || 0;

    const profit = totalRevenue - totalCost;

    return res.json({
      totalRevenue,
      totalCost,
      estimatedProfit: profit
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {getTotalSales,getBranchStock,getTotalRevenue,getTotalCreditOutstanding,getProcurementCostSummary,getProfitEstimation}