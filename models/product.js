const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    currentSellingPrice:{
        type:Number,
        required:true

    },
    unit:{
        type:String,
        default:"Kg"
    },
    isActive:{
        type:Boolean,
        default:true
    }
}, {timestamps:true})


const productModel = mongoose.model("products", productSchema)

module.exports = {productModel}