var express = require('express');
var path = require('path');

var sessionController = require('./controllers/sessionController');
var memberController = require('./controllers/memberController');
var companyController = require('./controllers/companyController');

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//automatically loads files (css, etc) from public folder
app.use('/assets', express.static(__dirname + '/public'))

var port = process.env.port || 3000;



var session = require('express-session');
var MySQLStore = require('express-mysql-session');

var config = require('./config').getSessionConnectionString();
var options = {
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database
}

var sessionStore = new MySQLStore(options)

//function genuuid(){
//
//}

app.use(session({
    
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false//,
    //genid: function(req){
    //    return genuuid();
    //}
}))

sessionController(app);
memberController(app);
companyController(app);

app.listen(port); 
