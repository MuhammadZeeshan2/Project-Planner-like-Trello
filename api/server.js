require('dotenv').config();
require('app-module-path').addPath(__dirname);


const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')
//Router
const apiRouter = require("./routes/api/v1")

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true

}).then(() => console.log('MongoDB Connected.'))
    .catch(err => this.console.log(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/api/v1/', apiRouter);
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

module.exports = app;
