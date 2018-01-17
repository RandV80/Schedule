var Members = require('../mysql/members');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});
var permissions = require('../globals').getPermissionLevels();
//var Members = require('./mysql/members');

function checkAccess(user, required){
    if (user >= required){
        console.log('Access granted: ' + user + ' >= ' + required);
        return true;
    }else{
        console.log ('Access denied: ' + user + ' < ' + required);
        return false;
    }
}

module.exports = function(app){
    app.get('/members', function(req, res){
        var requiredLevel = permissions.CHANGE;
        var userLevel = req.session.access;
        //console.log('Permission level:' + permissionLevel);        
        //console.log('Test Session access: ' + req.session.access)
        if(checkAccess(userLevel, requiredLevel)){
            var permissionLevel = permissions.VIEW;
            console.log('Permission level:' + permissionLevel);

            console.log('Test Session access: ' + req.session.access)
            Members.getAllMembers(function(err, data){
                if(err) throw err;
                res.render('members', {data: data});
            });
        }else{
            res.render('index', {});
        }
    });
    
    app.get('/addmember', function(req, res){
        var permissionLevel = permissions.CHANGE;
        console.log('Permission level:' + permissionLevel);

        res.render('memberadd', {});
    });

    app.post('/addmember', urlencodedParser, function(req, res){
        //console.log('POST: ' + JSON.stringify(req.body));
        var permissionLevel = permissions.CHANGE;
        console.log('Permission level:' + permissionLevel);

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
                    if(err) throw err;
                    console.log('Added Member: ' + JSON.stringify(data));
                    res.render('memberadd', {data: data});
                    //res.send('Added: ' + JSON.stringify(data))
                }, data);
            }else{
                console.log('id exists');
                idExists = {fail: 'id exists'};
                res.render('memberadd', {data: idExists});
            }
        }, memberId);
       // res.send('Posting: ' + JSON.stringify(req.body));
    });  
    
    //app.post('/memberadded', urlencodedParser, function(req, res){
      //  res.render(memberadded, {});
    //});
    
    app.post('/details', urlencodedParser, function(req,res){
        var permissionLevel = permissions.CHANGE;
        console.log('Permission level:' + permissionLevel);
        activeMemberId = req.body._memberNo;

        if(req.body._method){
            console.log("Update req: " + JSON.stringify(req.body));
            //This is a PUT, run an update
            console.log("Update detailsMember No: " + activeMemberId);
            Members.updateMemberDetails(function(err, data){
                Members.getMemberById(function(err, data){
                    if(err) throw err;
                    res.render('membereditDetails', {memberId: activeMemberId, data: data});
                }, activeMemberId);                
            }, req.body);
        }else{
            console.log('Active member ID in POST details: ' + activeMemberId);
            Members.getMemberById(function(err, data){
                if(err) throw err;
                //POST coming from Member screen, get data only
                res.render('membereditdetails', {memberId: activeMemberId, data: data}); 
                //console.log(JSON.stringify(data));           
            }, activeMemberId);
        }    
    });
    
    app.get('/details', function(req, res){
        var permissionLevel = permissions.CHANGE;
        console.log('Permission level:' + permissionLevel);
        //activeMemberId = req.body._memberNo;
        console.log('Active member ID in GET details: ' + activeMemberId);
        Members.getMemberById(function(err, data){
            if(err) throw err;
            res.render('membereditDetails', {memberId: activeMemberId, data: data});
        }, activeMemberId);
    });
    
    app.get('/programs', function(req, res){
        var permissionLevel = permissions.CHANGE;
        console.log('Permission level:' + permissionLevel);

        console.log('Active member ID in GET Programs: ' + activeMemberId);
        Members.getMemberById(function(err, data){
            if(err) throw err;
            res.render('membereditprograms', {memberId: activeMemberId, data: data});
        }, activeMemberId);
    });

    app.post('/programs', urlencodedParser, function(req,res){
        var permissionLevel = permissions.CHANGE;
        console.log('Permission level:' + permissionLevel);

        activeMemberId = req.body._memberNo;

        if(req.body._method){
            //console.log("Update req: " + JSON.stringify(req.body));
            //This is a PUT, run an update
            console.log("Update programs Member No: " + activeMemberId);
            Members.updateMemberPrograms(function(err, data){
                Members.getMemberById(function(err, data){
                    if(err) throw err;
                    res.render('membereditprograms', {memberId: activeMemberId, data: data});
                }, activeMemberId);                
            }, req.body);
        }else{
            console.log('Active member ID in POST programs: ' + activeMemberId);
            Members.getMemberById(function(err, data){
            if(err) throw err;
                //POST coming from Member screen, get data only
                res.render('membereditprograms', {memberId: activeMemberId, data: data}); 
                //console.log(JSON.stringify(data));           
            }, activeMemberId);
        }        
    });
    
    app.get('/settings', function(req, res){
        var permissionLevel = permissions.ADMIN;
        console.log('Permission level:' + permissionLevel);
        console.log('Active member ID in GET Settings: ' + activeMemberId);
        Members.getMemberById(function(err, data){
            if(err) throw err;
            res.render('membereditsettings', {memberId: activeMemberId, data: data});
        }, activeMemberId);   
    });

    app.post('/settings', urlencodedParser, function(req,res){
        var permissionLevel = permissions.ADMIN;
        console.log('Permission level:' + permissionLevel);        
        activeMemberId = req.body._memberNo;

        if(req.body._method){
            //console.log("Update req: " + JSON.stringify(req.body));
            //This is a PUT, run an update
            console.log("Update settings Member No: " + activeMemberId);
            Members.updateMemberSettings(function(err, data){
                Members.getMemberById(function(err, data){
                    if(err) throw err;
                    res.render('membereditsettings', {memberId: activeMemberId, data: data});
                }, activeMemberId);                
            }, req.body);
        }else{
            console.log('Active member ID in POST settings: ' + activeMemberId);
            Members.getMemberById(function(err, data){
                if(err) throw err;
                //POST coming from Member screen, get data only
                res.render('membereditsettings', {memberId: activeMemberId, data: data}); 
                //console.log(JSON.stringify(data));           
            }, activeMemberId);
        }    
    });    
    
    app.post('/deletemember', urlencodedParser, function(req, res){
        var permissionLevel = permissions.ADMIN;
        console.log('Permission level:' + permissionLevel);        
        //console.log('req: ' + JSON.stringify(req.body));
        var deleteMemberId = req.body._memberNo;
        var checkId = [];
        var data = req.body;

        console.log('deleting member: ' + deleteMemberId);
        
        Members.getMemberById(function(err, checkId){
            if(Object.keys(checkId).length !== 0){
                //MemberNo exists, deleting
                Members.deleteMember(function(err1, deleteMemberId, newdata){
                    if(err) throw err;
                    console.log('Deleted Member: ' + deleteMemberId);
                    Members.getAllMembers(function(err2, refreshdata){
                        if(err) throw err
                        res.redirect('/members');
                    });     
                }, deleteMemberId, data);
            }else{
                //MemberNo does not exist, return to page with message
                //var noId = {fail: 'Member No does not exist'};
                res.redirect('/members');
            }
        }, deleteMemberId);
    });
}
