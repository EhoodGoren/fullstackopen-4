require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const apiRouter = require('./src/routers/apiRouter')

const app = express();
const database = process.env.NODE_ENV === 'test' ?
    process.env.TEST_DATABASE :
    process.env.DATABASE;
mongoose.connect(database, () => {
    console.log('Database connected!');
})

app.use(express.json());
app.use(cors());

app.use('/api', apiRouter)

module.exports = app;
