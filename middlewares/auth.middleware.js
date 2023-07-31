const jwt = require('jsonwebtoken');
const secretKey = require('../configs/auth.config');

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if(!token) return res.status(403).send({
        message: `No token provided`
    });

    jwt.verify(token, secretKey.secret, (err, payload) => {
        if(err) {
            return res.status(401).send({
                message: `Not authorized!`
            });
        } 

        req.userId = payload.id;
        next();
    });

};

const authFunction = {
    verifyToken: verifyToken
}

module.exports = authFunction;

