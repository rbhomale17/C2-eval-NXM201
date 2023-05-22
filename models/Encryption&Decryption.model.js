const mongoose = require('mongoose');

const EncryptionDecryptionSchema = mongoose.Schema({
    id:{type:Number},
    password:{type:String, required:true}
},{versionKey:false});

const EncryptionDecryptionModel = mongoose.model("encryptedpwd",EncryptionDecryptionSchema);

module.exports = {EncryptionDecryptionModel}