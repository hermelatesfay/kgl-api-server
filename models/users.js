const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum: ["Manager","Sales agent","Director"]
    }
})

const userModel = mongoose.model("users",userSchema);


module.exports = {userModel}