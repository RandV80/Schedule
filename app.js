var express = require('express');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var path = require('path');
var memberController = require('./controllers/memberController');
var companyController = require('./controllers/companyController');

var app = express();


//app.use(session({secret: "???"}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//automatically loads files (css, etc) from public folder
app.use('/assets', express.static(__dirname + '/public'))

app.get('/', function(req, res){

    res.render('index', {});

});

var port = process.env.port || 3000;

memberController(app);
companyController(app);

app.listen(port); 
