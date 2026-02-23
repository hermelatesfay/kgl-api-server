const mongoose = require("mongoose");


let procurementSchema = new mongoose.Schema({
    nameOfProduce:{
        type: String,
        required: true,
        match:/^[a-zA-Z0-9]+$/
    },
    typeOfProduce:{
        type:String,
        required:true,
        minlength:2,
        match:/^[a-zA-Z]+$/
    },
    date:{
        type:Date,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    tonnage:{
        type:Number,
        required:true,
        minimum:3
    },
    cost:{
        type:Number,
        required:true,
        minlength:5
    },
    dealerName:{
        type:String,
        required:true,
        minlength:2,
        match:/^[a-zA-Z0-9]+$/
    },
    branch:{
        type:String,
        required:true,
        enum:{
            values:["Maganjo","Matugga"],
            message:"Branch must be either Maganjo or Matugga"
        }
    },
    contact:{
        type:String,
        required:true,
        match:/^(\+256|256|0)7\d{8}$/
    },
    sellingPrice:{
        type:Number,
        required:true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    }

}, { timestamps: true })

let procurementModel = mongoose.model("procurement",procurementSchema);


module.exports = {procurementModel};