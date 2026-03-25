const express = require("express");
const connectDB = require("./mongodb-server");
const {router: procurementRouter} = require("./routers/procurement.js")
const {router: salesRouter} = require("./routers/sales.js")
const {router: userRouter} = require("./routers/users.js")
const {router:authRouter} = require("./routers/auth.js")
const {router: stockRouter} = require("./routers/stock.js")
const {router: dashboardRouter} = require("./routers/dashboard.js")
const {router: productRouter} = require("./routers/product.js")
const {authMiddleware} = require("./middleware/authenticate.js")
const {errorHandler} = require("./middleware/errorHandler.js")
require("dotenv").config();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerSpec = require("./swagger/swagger.js");
const cors = require("cors")
// const helmet = require("helmet")
// const expressValidator = require("express-validator")
// const mongoSantize = require("express-mongo-sanitize") 
const basicAuth = require('express-basic-auth');
// const rateLimit = require("express-rate-limit")

connectDB()

const app = express();

const protectedRouter = express.Router()

app.use(cors({
    origin: [
    "http://localhost:5500",
    "http://127.0.0.1:5500"
  ],
  credentials: true,
    optionsSuccessStatus: 200
}))

// app.use(helmet())



// app.use(mongoSantize())

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100 // limit each IP to 100 requests
// });

// app.use(limiter);

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/procurement",procurementRouter)
app.use("/sales",salesRouter)
app.use("/users",userRouter)
app.use("/stock",stockRouter)
app.use("/dashboard",dashboardRouter)
app.use("/products",productRouter)

app.use("/auth",authRouter)

app.use("/",authMiddleware)

app.use(errorHandler)
const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is running successfully on port ${PORT}`)
})