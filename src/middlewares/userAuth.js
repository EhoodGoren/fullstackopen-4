require('dotenv').config();
const jwt = require('jsonwebtoken');

function userAuth(req, res, next) {
    try {
        const { authorization } = req.headers
        const userId = jwt.verify(authorization, process.env.SECRET);
        req.token = userId;
        next();
    } catch (error) {
        res.status(401).send('Invalid token');
    }
}

module.exports = userAuth;