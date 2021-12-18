require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./src/routers/blogsRouter');
const usersRouter =  require('./src/routers/usersRouter');

const app = express();
const database = process.env.NODE_ENV === 'test' ?
    process.env.TEST_DATABASE :
    process.env.DATABASE;
mongoose.connect(database, () => {
    console.log('Database connected!');
})

app.use(express.json());
app.use(cors());

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

module.exports = app;
