const express = require('express');
const { UserModel } = require('../models/user.model');
const userRouter = express.Router();
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const saltRounds = +process.env.saltRounds;

// /signup, /login, /logout, 

userRouter.get('/', async (req, res) => {
    let users = await UserModel.find();
    res.send({ message: 'Welcome to User Router', users })
});

userRouter.post('/signup', async (req, res) => {
    const { email, password, role } = req.body;
    try {
        if (!email || !password) {
            res.send({ message: 'Please Provide Email & Password.' })
        } else {
            bcrypt.hash(password, saltRounds, async function (err, hash) {
                if (err) res.send({ error: err.message });
                req.body.password = hash
                const newUser = new UserModel(req.body);
                await newUser.save();
                res.send({ message: 'User is Succesfully Registered.' })
            });
        }
    } catch (error) {
        res.send({ error: error.message })
    }
});

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) res.send({ message: 'Please Provide Email & Password.' });
        else {
            const isUserPresent = await UserModel.findOne({ email });
            if (!isUserPresent) res.send({ message: 'User is Not Present. Please Sign-up' });
            else {
                bcrypt.compare(password, isUserPresent.password, (err, result) => {
                    if (result) {
                        const access_token = jwt.sign({ userId: isUserPresent._id, role: isUserPresent.role }, process.env.acces_token_secretKey, { expiresIn: '1m' });
                        const refresh_token = jwt.sign({ userId: isUserPresent._id, role: isUserPresent.role }, process.env.refresh_token_secretKey, { expiresIn: '5m' });
                        res.send({ message: "Log-in Successful.", access_token, refresh_token })
                    } else {
                        res.send({ message: 'Wrong Password, Please Try Again.' })
                    }
                })
            }
        }
        // res.send({email,password});
    } catch (error) {
        res.send({ error: error.message })
    }
})

userRouter.post("/logout", async (req, res) => {
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) {
        res.send({ message: 'Provide Token is Correct Format ex. ( { Bearer token })' })
    } else {
        const blacklistedTokens = JSON.parse(fs.readFileSync('blacklist.json','utf-8'));
        blacklistedTokens.blacklist.push(token);
        fs.writeFileSync('blacklist.json',JSON.stringify(blacklistedTokens));
        res.send({message:'Logout successful.', message2:'token blacklisted in blacklist.json'})
    }
})

module.exports = {
    userRouter
}