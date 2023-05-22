const express = require('express');
const { UserModel } = require('../models/user.model');
const productRouter = express.Router();
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ProductModel } = require('../models/product.model');
const { AuthenticationAndAuthorisation } = require('../middlwares/Authentication&Authorisation');




productRouter.get('/', async (req, res) => {
    let products = await ProductModel.find();
    res.send({ message: 'Welcome to Product Router', products })
});

// /addproducts, /deleteproducts.

productRouter.post('/addproducts',AuthenticationAndAuthorisation,async(req,res)=>{
    const {title,price} = req.body;
    try {
        if(!title || !price) res.send({message:"Please Provide Both Title, Price & Ratings."});
        else{
            const product = new ProductModel(req.body);
            await product.save();
            res.send({message:'Product Added Successfully.'})
        }
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})

productRouter.delete('/deleteproducts/:id',AuthenticationAndAuthorisation,async(req,res)=>{
    const {id} = req.params;
    console.log(id)
    try {
        if(!id) res.send({message:"please provide ID"});
        else{
            let product = await ProductModel.findByIdAndDelete({id})
            res.send({message:'Product Deleted.'})
        }
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})

module.exports = {
    productRouter
}