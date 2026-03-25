const mongoose = require("mongoose");

const options = {discriminatorKey:"saleType", timestamps:true};


//Base sale schema
const saleSchema = new mongoose.Schema({
   
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true
    },
    tonnage:{
        type:Number,
        required:true,
        min:1000
    },
    salesAgentName:{
        type:String,
        required:true,
        minlength:2,
        match:/^[a-zA-Z0-9]+\s[a-zA-Z0-9]+$/
    },
    branch:{
        type:String,
        enum:["Maganjo","Matugga"],
        required:true
    },
    produceType:{
        type:String,
        required:true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    }

}, options)

const Sale = mongoose.model("sales",saleSchema);


//Cash sale schema
const cashSale = Sale.discriminator("cashSale", new mongoose.Schema({
    cashamountPaid:{
        type:Number,
        required:true,
        min:10000
    },
    buyerName:{
        type:String,
        required:true,
        minlength:2,
        match:/^[a-zA-Z0-9]+$/
    },
    date:{
        type:Date,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    }
}))


const CreditSale = Sale.discriminator("CreditSale", new mongoose.Schema({
    buyerName:{
        type:String,
        required:true,
        minlength:2,
        match:/^[a-zA-Z0-9]+$/

    },
    location:{
        type:String,
        required:true,
        minlength:2,
        match:/^[a-zA-Z0-9]+$/
    },
    contacts:{
        type:String,
        required:true,
        match:/^(\+256|256|0)7\d{8}$/
    },
    amountDue:{
        type:Number,        //remaining balance
        required:true,
        min:10000
    },
    dueDate:{
        type:Date,
        required:true
    },
    dispatchDate:{
        type:Date,
        required:true
    },
    nationalId:{
        type:String,
        required:true,
        match: /^(CM|CF)\d{12}$/
    },
    totalAmount:{
        type:Number         //Full sale value
    },
    creditamountPaid:{
        type:Number,
        default:0
    },
    paymentStatus:{
        type:String,
        enum:["Unpaid","Partial","Paid"],
        default:"Unpaid"
    }
}))

module.exports = {Sale, cashSale, CreditSale}
