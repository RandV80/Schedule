var Members = require('../mysql/members');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});
//var Members = require('./mysql/members');

module.exports = function(app){
    app.get('/members', function(req, res){
        Members.getAllMembers(function(err, data){
            if(err){
                res.json(err);
            }else{
                res.render('members', {data: data});
            }        
        });
    });
    
    app.get('/addmember', function(req, res){
        res.render('memberadd', {});
    });

    app.post('/addmember', urlencodedParser, function(req, res){
        //console.log('POST: ' + JSON.stringify(req.body));
        res.render('Posting: ' + JSON.stringify(req.body));
    });

    /*
    app.get('/addmemberdev', function(req, res){
        //console.log('POST: ' + JSON.stringify(req.body));
        res.render('memberadd-dev', {});
        //res.render('Posting: ' + JSON.stringify(req.body));
    });    */

    app.post('/addmember', urlencodedParser, function(req, res){
        //console.log('POST: ' + JSON.stringify(req.body));
        memberId = req.body._memberno;
        var data = req.body;
        console.log('Trying to add ID: ' + memberId);

        Members.getMemberById(function(err, checkId){
            var idExists = [];
            var member = [];

            if(Object.keys(checkId).length === 0){
                console.log('Running update');
                //The MemberNo is not in use, create a new record

                Members.addMember(function(err, newdata){
                    if(err){
                        console.log('MySQL ERROR');
                        res.json(err);
                    }else{
                        console.log('Added Member: ' + JSON.stringify(data));
                        res.render('memberadded', {data: data});
                        //res.send('Added: ' + JSON.stringify(data))
                    }
                }, data);
            }else{
                console.log('id exists');
                idExists = {fail: 'id exists'};
                res.render('companyadd', {data: idExists});
            }
        }, memberId);
       // res.send('Posting: ' + JSON.stringify(req.body));
    });  
    
    app.post('/memberadded', urlencodedParser, function(req, res){
        res.render(memberadded, {});
    });
    
    app.post('/details', urlencodedParser, function(req,res){
        activeMemberId = req.body._memberNo;

        if(req.body._method){
            console.log("Update req: " + JSON.stringify(req.body));
            //This is a PUT, run an update
            console.log("Update detailsMember No: " + activeMemberId);
            Members.updateMemberDetails(function(err, data){
                Members.getMemberById(function(err, data){
                    if(err){
                        res.json(err);
                    }else{        
                        res.render('membereditDetails', {memberId: activeMemberId, data: data});
                    }
                }, activeMemberId);                
            }, req.body);
        }else{
            console.log('Active member ID in POST details: ' + activeMemberId);
            Members.getMemberById(function(err, data){
                if(err){
                    res.json(err);
                }else{
                    //POST coming from Member screen, get data only
                    res.render('membereditdetails', {memberId: activeMemberId, data: data}); 
                    //console.log(JSON.stringify(data));           
                }
            }, activeMemberId);
        }    
    });
    
    app.get('/details', function(req, res){
        //activeMemberId = req.body._memberNo;
        console.log('Active member ID in GET details: ' + activeMemberId);
        Members.getMemberById(function(err, data){
            if(err){
                res.json(err);
            }else{        
                res.render('membereditDetails', {memberId: activeMemberId, data: data});
            }
        }, activeMemberId);
    });
    
    app.get('/programs', function(req, res){
        console.log('Active member ID in GET Programs: ' + activeMemberId);
        Members.getMemberById(function(err, data){
            if(err){
                res.json(err);
            }else{
                res.render('membereditprograms', {memberId: activeMemberId, data: data});
            }
        }, activeMemberId);
    });

    app.post('/programs', urlencodedParser, function(req,res){
        activeMemberId = req.body._memberNo;

        if(req.body._method){
            //console.log("Update req: " + JSON.stringify(req.body));
            //This is a PUT, run an update
            console.log("Update programs Member No: " + activeMemberId);
            Members.updateMemberPrograms(function(err, data){
                Members.getMemberById(function(err, data){
                    if(err){
                        res.json(err);
                    }else{        
                        res.render('membereditprograms', {memberId: activeMemberId, data: data});
                    }
                }, activeMemberId);                
            }, req.body);
        }else{
            console.log('Active member ID in POST programs: ' + activeMemberId);
            Members.getMemberById(function(err, data){
                if(err){
                    res.json(err);
                }else{
                    //POST coming from Member screen, get data only
                    res.render('membereditprograms', {memberId: activeMemberId, data: data}); 
                    //console.log(JSON.stringify(data));           
                }
            }, activeMemberId);
        }    
    });
    
    app.get('/settings', function(req, res){
        console.log('Active member ID in GET Settings: ' + activeMemberId);
        Members.getMemberById(function(err, data){
            if(err){
                res.json(err);
            }else{
                res.render('membereditsettings', {memberId: activeMemberId, data: data});
            }
        }, activeMemberId);    
    });

    app.post('/settings', urlencodedParser, function(req,res){
        activeMemberId = req.body._memberNo;

        if(req.body._method){
            //console.log("Update req: " + JSON.stringify(req.body));
            //This is a PUT, run an update
            console.log("Update settings Member No: " + activeMemberId);
            Members.updateMemberSettings(function(err, data){
                Members.getMemberById(function(err, data){
                    if(err){
                        res.json(err);
                    }else{        
                        res.render('membereditsettings', {memberId: activeMemberId, data: data});
                    }
                }, activeMemberId);                
            }, req.body);
        }else{
            console.log('Active member ID in POST settings: ' + activeMemberId);
            Members.getMemberById(function(err, data){
                if(err){
                    res.json(err);
                }else{
                    //POST coming from Member screen, get data only
                    res.render('membereditsettings', {memberId: activeMemberId, data: data}); 
                    //console.log(JSON.stringify(data));           
                }
            }, activeMemberId);
        }    
    });    
    
    app.post('/deletemember', urlencodedParser, function(req, res){
        console.log('req: ' + JSON.stringify(req.body));
        var deleteMemberId = req.body._memberNo;
        console.log('deleting member: ' + deleteMemberId);
        Members.getAllMembers(function(err, data){
            if(err){
                res.json(err);
            }else{
                res.render('index', {data: data});
            }        
        });        

    });
}
