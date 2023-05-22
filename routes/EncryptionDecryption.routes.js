const express = require('express');
const EncryptionDecryptionRouter = express.Router();
require('dotenv').config();

const Cryptr = require('cryptr');
const { EncryptionDecryptionModel } = require('../models/Encryption&Decryption.model');
const cryptr = new Cryptr(process.env.cryptr_Secret_Key);

EncryptionDecryptionRouter.post("/encryptmypwd", async (req, res) => {
    // res.send('/encryptmypwd here')
    const { id, password } = req.body;
    try {
        if (!id || !password) {
            res.send({ message: 'Please Provide Both ID and Password' })
        } else {
            const encryptedString = cryptr.encrypt(password);
            const storePass = new EncryptionDecryptionModel({ id, password: encryptedString });
            await storePass.save();
            res.send({ message: 'Password stored successfully in encrypted form' })
        }
    } catch (error) {
        res.send({error:error.message})
    }
});

EncryptionDecryptionRouter.get('/getmypwd', async (req, res) => {
    const { id } = req.query;
    try {
        if(!id){
            res.send({message:'Please Provide The ID in Query.'});
        }else{
            let isIDPresent = await EncryptionDecryptionModel.findOne({id});
            if(!isIDPresent){
                res.send({message:'Invalid ID'})
            }else{
                // console.log(isIDPresent)
                const decryptedString = cryptr.decrypt(isIDPresent.password);
                // console.log(decryptedString);
                res.send({message:"Validation Success", password: decryptedString})
            }
        }
    } catch (error) {
        res.send({error:error.message})
    }
})


module.exports = { EncryptionDecryptionRouter }