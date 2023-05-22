const express = require('express');
const { connection } = require('./config/db');
const { EncryptionDecryptionRouter } = require('./routes/EncryptionDecryption.routes');
const { HashingVerifyingRouter } = require('./routes/Hashing&Verifying.route');
const { userRouter } = require('./routes/users.route');
const { productRouter } = require('./routes/products.route');
const app = express();
app.use(express.json());
require('dotenv').config();
const port = process.env.port || 4545;


app.get("/",(req,res)=>{
    res.send("server working fine.")
});

app.use('/encrypt',EncryptionDecryptionRouter);
app.use('/hash',HashingVerifyingRouter)
app.use('/users',userRouter)
app.use('/products',productRouter)
app.listen(port,async()=>{
try {
    await connection;
    console.log('connected to DB')
} catch (error) {
    console.log(error)
    console.log('failed to connect DB');
}
    console.log('server running on: '+ port)
})