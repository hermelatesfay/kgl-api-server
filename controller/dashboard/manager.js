const {procurementModel} = require("../../models/procurement.js")
const {stockModel} = require("../../models/stock.js")
const { Sale, cashSale, CreditSale } = require("../../models/sales.js");
const {productModel} = require("../../models/product.js")


const getManagerSummary = async (req, res) => {
  try {
    const totalStock = await stockModel.aggregate([
      { $group: { _id: null, total: { $sum: "$remainingStock" } } }
    ]);

    const totalSales = await Sale.aggregate([
      { $group: { _id: null, total: { $sum: "$tonnage" } } }
    ]);

    const totalProcurement = await procurementModel.aggregate([
      { $group: { _id: null, total: { $sum: "$tonnage" } } }
    ]);

    const totalRevenue = await Sale.aggregate([
      { $match: { saleType: "cashSale" } },
      { $group: { _id: null, total: { $sum: "$amountPaid" } } }
    ]);

    const totalCreditOutstanding = await Sale.aggregate([
      { $match: { saleType: "CreditSale" } },
      { $group: { _id: null, total: { $sum: "$amountDue" } } }
    ]);

    return res.json({
      totalStock: totalStock[0]?.total || 0,
      totalSales: totalSales[0]?.total || 0,
      totalProcurement: totalProcurement[0]?.total || 0,
      totalRevenue: totalRevenue[0]?.total || 0,
      totalCreditOutstanding: totalCreditOutstanding[0]?.total || 0
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getLowStock = async (req, res) => {
  try {
    const lowStock = await stockModel
      .find({ remainingStock: { $lt: 1000 } })
      .populate("product", "name");

    return res.json(lowStock);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getRecentTransactions = async (req, res) => {
  try {
    const recentSales = await Sale
      .find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("product", "name");

    const recentProcurements = await procurementModel
      .find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("product", "name");

    return res.json({
      recentSales,
      recentProcurements
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const getPriceManagement = async (req, res) => {
  try {
    const products = await productModel.find();

    return res.json(products);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const updatePrice = async(req,res)=>{
    try{
      const productId = req.params.id
      const body = req.body

      const update = await productModel.findByIdAndUpdate(productId,body, {new:true})

      if(update){
            res.status(200).json({message:"Price successfully updated"})
        }else{
            res.status(400).json({message:"Failed to update price"})
        }
    }catch(error){
        res.status(500).json({message:error.message})
    }
}


const getBranchReport = async (req, res) => {
  try {
    const branchSales = await Sale.aggregate([
      {
        $group: {
          _id: "$branch",
          totalSales: { $sum: "$tonnage" }
        }
      }
    ]);

    const branchStock = await stockModel.aggregate([
      {
        $group: {
          _id: "$branch",
          remainingStock: { $sum: "$remainingStock" }
        }
      }
    ]);

    res.json({
      branchSales,
      branchStock
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getStockLevels = async (req, res) => {

try {

const stocks = await stockModel.aggregate([

{
$group:{
_id: "$product",
remainingStock: { $sum: "$remainingStock" },
totalProcured: { $sum: "$totalProcured" }
}
},

{
$lookup:{
from:"products",
localField:"_id",
foreignField:"_id",
as:"product"
}
},

{
$unwind:"$product"
}

])

const result = stocks.map(stock => {

let percentage = 0

if(stock.totalProcured && stock.totalProcured > 0){

percentage = Math.round(
(stock.remainingStock / stock.totalProcured) * 100
)

}

return {

productId: stock.product._id,
produce: stock.product.name,
remainingStock: stock.remainingStock,
capacity: stock.totalProcured,
percentage

}

})

res.json(result)

} catch(error){

res.status(500).json({message:error.message})

}

}

module.exports = {getManagerSummary,getLowStock,getRecentTransactions,getPriceManagement,updatePrice,getBranchReport,getStockLevels}

