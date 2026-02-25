const {userModel} = require("../models/users.js")


const getUser = async(req,res)=>{
    try{
        const user = await userModel.find()
        
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        return res.status(200).json({message:"Users found successfully",user})
    }catch(err){
        return res.status(404).json({message:"Users not found",err})
    }
}


const updateUser = async(req,res)=>{
    try{
        const id = req.params.id
        const body = req.body

        let updateUser = await userModel.findByIdAndUpdate(id,body,{new:true})
        if(updateUser){
            return res.status(200).json({message:"Update successful",updateUser})
        }else{
            return res.status(400).json({message:"Failed to update user"})
        }
    }catch(err){
        return res.status(400).json({message:"Failed to update user"})
    }
}


const deleteUser = async(req,res)=>{
    try{
        const id = req.params.id
        let deleteUser = await userModel.findByIdAndDelete(id)
        if(deleteUser){
            return res.status(200).json({message:"User deleted Successfully"})
        }else{
            return res.status(400).json({message:"Failed to delete user"})
        }
    }catch(err){
        return res.status(400).json({message:"Failed to delete user"})
    }
}


module.exports = {getUser,updateUser,deleteUser}