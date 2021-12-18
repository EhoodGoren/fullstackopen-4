require('dotenv').config();
const jwt = require('jsonwebtoken');

function userAuth(req, res, next) {
    try {
        const { Authorization } = req.headers
        const user = jwt.verify(Authorization, process.env.SECRET);
        req.token = user;
        next();
    } catch (error) {
        res.status(401).send('Invalid token');
    }
}

module.exports = userAuth;