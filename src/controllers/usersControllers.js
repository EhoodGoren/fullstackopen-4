require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    const populatedUsers = await User.find({}).populate('blogs', { title:1, author:1, url:1, likes:1 });
    res.json(populatedUsers);
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
        const addedUser = await User.create({username, password: encryptedPassword, name, blogs: []});
        const userToken = jwt.sign(addedUser.id, process.env.SECRET);
        res.status(201).send(userToken);
    } catch (error) {
        res.status(400).send('Username already taken. Please choose another');
    }
}

module.exports = {
    getUsers,
    addUser
}
