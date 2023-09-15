const express = require('express');
const mongoose = require ('mongoose');
const postRoute = require('../routes/post');
const commentRoute = require('../routes/comment');
const userRoute = require('../routes/user');

const app= express() ;
app.use(express.json());

// delaring routes 

app.use('/Post', postRoute);
app.use('/Comment', commentRoute);
app.use('/User', userRoute);

module.exports = app;
