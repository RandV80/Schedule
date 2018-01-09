var Members = require('../mysql/members');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

    app.get('/', function(req, res){

        res.render('index', {});
    
    });
    
    app.post('/', urlencodedParser, function(req, res){
        //console.log('POST: ' + JSON.stringify(req.body));
        var email = req.body._email;
        var password = req.body._password;

        console.log('email: ' + email + ' password: ' + password );

        Members.getAllMembers(function(err, data){
            if(err){
                res.json(err);
            }else{
                res.render('members', {data: data});
            }        
        });
    });    

}