const mongoose = require("mongoose");

const options = {discriminatorKey:"saleType", timestamp:true};


//Base sale schema
const saleSchema = new mongoose.Schema({
    produceName:{
        type:String,
        required:true
    },
    tonnage:{
        type:Number,
        required:true,
        min:4
    },
    salesAgentName:{
        type:String,
        required:true,
        minlength:2,
        match:/^[a-zA-Z0-9]+$/
    }
}, options)

const Sale = mongoose.model("sales",saleSchema);


//Cash sale schema
const cashSale = Sale.discriminator("cashSale", new mongoose.Schema({
    amountPaid:{
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
        type:Number,
        required:true,
        min:10000
    },
    dueDate:{
        type:Date,
        required:true
    },
    produceType:{
        type:String,
        required:true
    },
    dispatchDate:{
        type:Date,
        required:true
    },
    nationalId:{
        type:String,
        required:true,
        match: /^[A-Z]{2}\d{12}$/
    }
}))

module.exports = {Sale, cashSale, CreditSale}
