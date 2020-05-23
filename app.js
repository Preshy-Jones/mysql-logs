const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');
const session = require('express-session');
const morgan = require('morgan')
const path = require('path')
const fs = require('fs');
const port = process.env.PORT || 8007
const chalk = require('chalk');

//mysql://bfc148d01d2b40:eee07c6c@us-cdbr-east-06.cleardb.net/heroku_5b4be569d534dc8?reconnect=true
const app = express();

const bodyParser = require('body-parser');


app.use(morgan('dev'))

app.use(morgan('tiny', {
    stream: fs.createWriteStream(path.join(__dirname, 'logs'))
}))

// create a write stream (in append mode)
//var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
//app.use(morgan('combined', { stream: accessLogStream }))

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    }
}));


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));


app.use('/', require('./routes/auth'))
// app.use('/', require('./routes/index'));
// app.use('/api/url', require('./routes/url'));


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
