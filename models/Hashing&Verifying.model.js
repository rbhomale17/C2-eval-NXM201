const mongoose = require('mongoose');

const HashingVerifyingSchema = mongoose.Schema({
    id:{type:Number},
    password:{type:String, required:true}
},{versionKey:false});

const HashingVerifyingModel = mongoose.model("hashedpwd",HashingVerifyingSchema);

module.exports = {HashingVerifyingModel}