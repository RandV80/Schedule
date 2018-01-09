var express = require('express');
var path = require('path');

var indexController = require('./controllers/indexController');
var memberController = require('./controllers/memberController');
var companyController = require('./controllers/companyController');

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var app = express();
//app.use(session({secret: "???"}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//automatically loads files (css, etc) from public folder
app.use('/assets', express.static(__dirname + '/public'))

var port = process.env.port || 3000;

indexController(app);
memberController(app);
companyController(app);

var session = require('express-session');
var MySQLStore = require('express-mysql-session');

var sessionConfig = require('./config').getSessionConnectionString;

var options = {
    host: sessionConfig.host,
    port: sessionConfig.port,
    user: sessionConfig.user,
    password: sessionConfig.password,
    database: sessionConfig.database
}

var sessionStore = new MySQLStore(options);

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}))

sessionStore.close();

app.listen(port); 
