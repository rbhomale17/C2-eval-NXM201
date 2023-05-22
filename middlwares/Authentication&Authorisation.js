const jwt = require('jsonwebtoken');


const AuthenticationAndAuthorisation = (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) {
        res.send({ message: 'Provide Token is Correct Format ex. ( { Bearer token })' })
    } else {
        jwt.verify(token, process.env.acces_token_secretKey, (err, decoded) => {
            if (err) res.send({ message: err.message });
            else {
                console.log(decoded)
                if (decoded) {
                    if (decoded.role === 'seller') {
                        next();
                    } else {
                        res.send({ message: "Unauthorized." })
                    }
                }
            }
        });
    }
};

module.exports = {
    AuthenticationAndAuthorisation
}