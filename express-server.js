const express = require("express");
const connectDB = require("./mongodb-server");
const {router: procurementRouter} = require("./routers/procurement.js")
const {router: salesRouter} = require("./routers/sales.js")
const {router: userRouter} = require("./routers/users.js")
const {router:authRouter} = require("./routers/auth.js")
const {authMiddleware} = require("./middleware/user.js")
require("dotenv").config();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerSpec = require("./swagger/swagger.js");
const cors = require("cors")
const basicAuth = require('express-basic-auth');

connectDB()

const app = express();

const protectedRouter = express.Router()

app.use(cors({
    origin: "http://localhost:5500",
    optionsSuccessStatus: 200
}))

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/procurement",procurementRouter)
app.use("/sales",salesRouter)
app.use("/users",userRouter)

app.use("/auth",authRouter)

app.use("/",authMiddleware,protectedRouter)


const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is running successfully on port ${PORT}`)
})