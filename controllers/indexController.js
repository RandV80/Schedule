var Members = require('../mysql/members');
var Session = require('../mysql/session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

    app.get('/', function(req, res){

        res.render('index', {});
    
    });
    
    app.post('/', urlencodedParser, function(req, res){
        //console.log('POST: ' + JSON.stringify(req.body));
        var user = req.body._user;
        var password = req.body._password;
        var fail = [];

        Session.getLogin(function(err, data){
            if (err) throw err;
            //console.log('results: ' + JSON.stringify(data));
            if(Object.keys(data).length !== 0){
                console.log('login successful');
                if (password === data[0].Password){
                    Members.getAllMembers(function(err, data){
                        if(err) throw err;
                        res.render('members', {data: data});
                    });
                }else{
                    fail = {source: 'password', login: user};
                    console.log('Login failed');
                    res.render('index', {error: fail});
                }
                
            }else{
                fail = {source: 'user', login: user};
                console.log('results: User not found');
                res.render('index', {error: fail});
            }            
        },user);

    });    

}