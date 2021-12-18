require('dotenv').config();
const jwt = require('jsonwebtoken');

function userAuth(req, res, next) {
    try {
        const { token } = req.headers
        const user = jwt.verify(token, process.env.SECRET);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send('Invalid token');
    }
}

module.exports = userAuth;