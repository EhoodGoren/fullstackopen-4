const User = require('../models/user');

async function userExtractor(req, res, next) {
    const userId = req.token;
    const user = await User.findOne({ _id: userId });
    req.user = user.username;
    next();
}

module.exports = userExtractor;
