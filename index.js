const express = require("express");
const app = new express();
var session = require('express-session')
var MySQLStore = require('express-mysql-session')(session);
const db_connection = require('./config/db_connection');
var flash = require('connect-flash');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

const indexRouter = require('./routes/index.router');
const usersRouter = require('./routes/user.router');

app.use('/assets', express.static('assets'));
app.use('/uploads', express.static('uploads'));
app.set("view engine", "ejs");

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    expires: new Date(Date.now() + (30 * 86400 * 1000)),
    store: new MySQLStore({
        host: "localhost",
        user: "root",
        password: "",
        database: "ecommerce_node"
    })
}))

// middleware to make 'user' available to all templates
app.use(function(req, res, next) {
    res.locals.fullname = req.session.fullname;
    res.locals.firstname = req.session.firstname;
    res.locals.lastname = req.session.lastname;
    res.locals.isUserLoggedIn = req.session.isUserLoggedIn;
    next();
});



app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())

app.use('/', indexRouter);
app.use('/user', usersRouter);

app.listen(4000);