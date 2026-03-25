const {productModel} = require("../models/product.js")

const createProduct = async(req,res)=>{
    try{
        const {name, currentSellingPrice} = req.body

        const product = await productModel.create({
            name,
            currentSellingPrice
        })

        res.status(201).json(product)
    }catch(error){
        res.status(400).json({message: error.message})
    }
}


const getProducts = async(req,res)=>{
    try{
        const products = await productModel.find()
        res.status(200).json(products)
    }catch(error){
        res.status(400).json({message: error.message})
    }
}


const updateProduct =  async(req,res)=>{
    try{
        const id = req.params.id
        const body = req.body

        const product = await productModel.findByIdAndUpdate(id,body,{new: true}) 

        if(product){
            res.status(200).json({message: "Product updated successfully", product})
        }else{
            res.status(400).json({message: "Failed to update product"})
        }

    }catch(error){
        res.status(500).json({message: error.message})
    }
}


const deleteProduct = async(req, res)=>{
    try{
        const id = req.params.id

        const product = await productModel.findByIdAndDelete(id)

        if(product){
            res.status(200).json({message: "Product deleted successfully"})
        }else{
            res.status(400).json({message: "Failed to delete product"})
        }
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {createProduct, getProducts, updateProduct, deleteProduct}