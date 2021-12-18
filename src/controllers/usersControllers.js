const bcrypt = require('bcrypt');
const User = require('../models/user');

const saltRounds = 10;

async function getUsers(req, res) {
    const users = await User.find({});
    const noPasswordUsers = users.map(({ username, name, id }) => {
        return {
            username,
            name,
            id
        }
    });
    res.json(noPasswordUsers);
}

async function addUser(req, res) {
    const {username, password, name} = req.body;
    if(!username || !password || !name){
        return res.status(400).send('Missing information');
    }
    const encryptedPassword = await bcrypt.hash(`${password}`, saltRounds);
    const postResponse = await User.create({username, password: encryptedPassword, name});
    res.status(201).json('Added user successfully');
}

module.exports = {
    getUsers,
    addUser
}
