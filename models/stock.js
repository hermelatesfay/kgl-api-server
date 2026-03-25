const { default: mongoose } = require("mongoose");
const mongooose = require("mongoose");

const stockSchema =  new mongoose.Schema({
   
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true
    },
    branch:{
        type:String,
        enum:["Maganjo","Matugga"],
        required:true
    },
    totalProcured:{
        type:Number,
        default:0
    },
    totalSold:{
        type:Number,
        default:0
    },
    remainingStock:{
        type:Number,
        default:0
    }
}, {timestamps:true})


const stockModel = mongoose.model("stock", stockSchema)



module.exports = {stockModel}