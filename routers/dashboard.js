const express = require("express");
const router = express.Router();
const {authorize} = require("../middleware/authorize.js")
const {authMiddleware} = require("../middleware/authenticate.js")
const {getManagerSummary,getLowStock,getRecentTransactions,getPriceManagement,updatePrice,getBranchReport,getStockLevels} = require("../controller/dashboard/manager.js")
const {getAgentStock,getAgentSales,getAgentDailySales,getAgentCreditSales,getAgentCashSummary} = require("../controller/dashboard/sales-agent.js")
const {getTotalSales,getBranchStock,getTotalRevenue,getTotalCreditOutstanding,getProcurementCostSummary,getProfitEstimation} = require("../controller/dashboard/director.js")



    //Manager routes
router.get("/manager/summary",authMiddleware,authorize("Manager"),getManagerSummary);

router.get("/manager/low-stock",authMiddleware,authorize("Manager"),getLowStock);

router.get("/manager/recent-transactions",authMiddleware,authorize("Manager"),getRecentTransactions);

router.get("/manager/price-management",authMiddleware,authorize("Manager"),getPriceManagement);

router.patch("manager/update-price/:productId",authMiddleware,authorize("Manager"),updatePrice)

router.get("/manager/branch-report",authMiddleware,authorize("Manager"),getBranchReport)

router.get("/manager/stock-levels",authMiddleware,authorize("Manager"),getStockLevels)



    //sales agent routes
router.get("/sales-agent/stock",authMiddleware,authorize("Sales agent"),getAgentStock)

router.get("/sales-agent/sales",authMiddleware,authorize("Sales agent"),getAgentSales)

router.get("/sales-agent/daily-sales",authMiddleware,authorize("Sales agent"),getAgentDailySales)

router.get("/sales-agent/credit-sales",authMiddleware,authorize("Sales agent"),getAgentCreditSales)

router.get("/sales-agent/cash-summary",authMiddleware,authorize("Sales agent"),getAgentCashSummary)



       //Director routes

router.get("/director/total-sales",authMiddleware,authorize("Director"),getTotalSales)

router.get("/director/branch-stock",authMiddleware,authorize("Director"),getBranchStock)

router.get("/director/totalRevenue",authMiddleware,authorize("Director"),getTotalRevenue)

router.get("/director/credit-outstanding",authMiddleware,authorize("Director"),getTotalCreditOutstanding)

router.get("/director/procurement-cost",authMiddleware,authorize("Director"),getProcurementCostSummary)

router.get("/director/profit-estimation",authMiddleware,authorize("Director"),getProfitEstimation)




module.exports = { router };


