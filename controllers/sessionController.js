var Members = require('../mysql/members');
var Session = require('../mysql/session');

module.exports = function(app){

    app.get('/', function(req, res){
        res.render('index', {});
        console.log('session1:' + req.session);
    
    });
    
    app.post('/', function(req, res){
        console.log('session2:' + req.session);
        var user = req.body._user;
        var password = req.body._password;
        var fail = [];

        Session.getLogin(function(err, data){
            if (err) throw err;
            console.log('results: ' + JSON.stringify(data));

            if(Object.keys(data).length !== 0){
                
                
                if (password === data[0].Password){
                    console.log('login successful');
                    req.session.access = data[0].SecurityLevel;

                    Members.getAllMembers(function(err, data){
                        if(err) throw err;
                        res.redirect('/members');
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

    app.get('/logout', function(req, res){
        console.log('destroy session');
        req.session.destroy();
        res.render('index', {});
    });

}