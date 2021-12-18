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
    if(username.length < 4 || password.length < 4){
        return res.status(400).send('Username and password must both be atleast 4 characters long');
    }
    const encryptedPassword = await bcrypt.hash(`${password}`, saltRounds);
    try {
        await User.create({username, password: encryptedPassword, name});
        res.status(201).json('Added user successfully');
    } catch (error) {
        res.status(400).send('Username already taken. Please choose another');
    }
}

module.exports = {
    getUsers,
    addUser
}
