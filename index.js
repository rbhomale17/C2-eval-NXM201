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


app.get("/", (req, res) => {
    res.send({
        message: 'Welcome To Server of Rushikesh Bhomale.',
        Student_Name: "Rushikesh Bhomale",
        Student_Code: 'fw25_348',
        Curent_Unit: 'Unit-5',
        server_description: "This Server is created for NXM201 C2 Evaluation held on 22/05/2023 Monday By Masai School",
        userfull_Routes: {
            encrypt:`app.use('/encrypt', EncryptionDecryptionRouter)`,
            hash:`app.use('/hash', HashingVerifyingRouter)`,
            users:`app.use('/users', userRouter)`,
            products:`app.use('/products', productRouter)`,
            getAllUsers:`/users`
        }
    })
});

app.use('/encrypt', EncryptionDecryptionRouter);
app.use('/hash', HashingVerifyingRouter)
app.use('/users', userRouter)
app.use('/products', productRouter)

app.listen(port, async () => {
    try {
        await connection;
        console.log('connected to DB')
    } catch (error) {
        console.log(error)
        console.log('failed to connect DB');
    }
    console.log('server running on: ' + port);
    console.log(`Server Run Url: ` + `http://localhost:${port}`)
})