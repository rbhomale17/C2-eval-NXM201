const express = require('express');
const { HashingVerifyingModel } = require('../models/Hashing&Verifying.model');
const HashingVerifyingRouter = express.Router();
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = +process.env.saltRounds

HashingVerifyingRouter.post("/hashmypwd", async (req, res) => {
    // res.send('/encryptmypwd here')
    const { id, password } = req.body;
    try {
        if (!id || !password) {
            res.send({ message: 'Please Provide Both ID and Password' })
        } else {
            bcrypt.hash(password, saltRounds, async function (err, hash) {
                if (err) res.send({ error: err.message });
                // console.log(hash);
                const storePass = new HashingVerifyingModel({ id, password: hash });
                await storePass.save();
                res.send({ message: 'Hash of the Password stored successfully.' })
            });
        }
    } catch (error) {
        res.send({ error: error.message })
    }
});

HashingVerifyingRouter.get('/verifymypwd', async (req, res) => {
    const { id, password } = req.query;
    try {
        if (!id || !password) {
            res.send({ message: 'Please Provide The Both ID and Password in Query.' });
        } else {
            let isIDPresent = await HashingVerifyingModel.findOne({ id });
            if (!isIDPresent) {
                res.send({ message: 'Invalid ID' })
            } else {
                // console.log(isIDPresent)
                bcrypt.compare(password, isIDPresent.password, function(err, result) {
                    // result == true
                    console.log(result)
                    if(result) res.send({ message: `Password is Correct`, isPassword_Provided_Correct:result });
                    else res.send({ message: `Password is Not Correct`, isPassword_Provided_Correct:result })
                });
            }
        }
    } catch (error) {
        res.send({ error: error.message })
    }
})


module.exports = { HashingVerifyingRouter }