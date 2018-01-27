var Companies=require('../mysql/companies');
var permissions = require('../globals').getPermissionLevels();



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

    app.get('/companies', function(req, res){
        if (!req.body) return res.sendStatus(400);

        var requiredLevel = permissions.CHANGE;
        var userLevel = req.session.access;

        if(checkAccess(userLevel, requiredLevel)){
            Companies.getAllCompanies(function(err, data){
                if (err){
                    res.json(err);
                }else{
                    res.render('companies', {data: data});
                }
            });
        }else{
            res.get('/members');
        }
    });
    

    app.post('/editcompany',  function(req,res){
        var requiredLevel = permissions.CHANGE;
        var userLevel = req.session.access;
        
        if(checkAccess(userLevel, requiredLevel)){
            console.log('POST: ' + JSON.stringify(req.body));
            
            activeCompanyId = req.body._companyNo

            if (req.body._method){
                //This is a PUT, run an update
                console.log("Update Company No: " + activeCompanyId);

                Companies.updateCompany(function(err, data){
                    if(err){
                        res.json(err);
                    }else{
                        Companies.getCompanyById(function(err, data){
                            if(err){
                                res.json(err);
                            }else{
                                res.render('companyedit', {companyId: activeCompanyId, data: data});
                            }
                        }, activeCompanyId);
                    }
                }, req.body);
                //console.log(req.body._method);
            }else{
                //POST coming from Company screen, get data only
                console.log('Get Company for edit: ' + activeCompanyId);

                Companies.getCompanyById(function(err, data){
                    if(err){
                        res.json(err);
                    }else{
                        res.render('companyedit', {companyId: activeCompanyId, data: data});
                    }
                }, activeCompanyId);
            }
        }else{
            res.get('/companies');
        }
    });

    app.get('/addcompany', function(req, res){
        var requiredLevel = permissions.CHANGE;
        var userLevel = req.session.access;

        if(checkAccess(userLevel, requiredLevel)){
            res.render('companyadd', {});
        }else{
            res.get('/companies');
        }
    });
    
    
    app.post('/addcompany', function(req,res){
        var requiredLevel = permissions.CHANGE;
        var userLevel = req.session.access;

        if(checkAccess(userLevel, requiredLevel)){
            var data = req.body;
            companyId = req.body._companyNo;

            console.log('Trying to add ID: ' + companyId);
        
            //Call getCompanyById to check if Company No already exists
            Companies.getCompanyById(function(err, checkId){
                var idExists = [];
                var company = [];
    
                if (Object.keys(checkId).length === 0){
                    console.log ('Running update');
                    //The CompanyNo is not in use, create a new record
        
                    Companies.addCompany(function(err, newdata){
                        if(err){
                            res.json(err);
                        }else{
                            console.log('Added Company: ' + JSON.stringify(data));
                            res.render('companyadd', {fail: [], data: data});
                        }
                    }, data);
                    
                }else{
                    console.log('id exists');
                    idExists = {fail: 'id exists'};
                    res.render('companyadd', {fail: idExists, data:[]});
                }
            }, companyId);
        }else{
            res.get('/companies');
        }
    });
    
    app.post('/companies/delete', function(req, res){   
        var requiredLevel = permissions.ADMIN;
        var userLevel = req.session.access;       

            if(checkAccess(userLevel, requiredLevel)){
            var deleteCompanyId = req.body._companyNo;
            var checkId = [];
            var data = req.body;
            console.log('Deleting company: ' + deleteCompanyId);

            Companies.getCompanyById(function(err, checkId){
                if(Object.keys(checkId).length !== 0){
                    //CompanyNo exists, deleting
                    Companies.deleteCompany(function(err1, deleteCompanyId, newdata){
                        if(err1){
                            res.json(err1);
                        }else{
                            console.log('Deleted Company: ' + deleteCompanyId);
                            //console.log('data: ' +JSON.stringify(data));
                            //res.render('companies', {data: data});
                            Companies.getAllCompanies(function(err2, refreshdata){
                                if (err2){
                                    res.json(err2);
                                }else{
                                    res.redirect('/companies');
                                }
                            });                    
                        }
                    }, deleteCompanyId, data)
        
                }else{
                    //CompanyNo does not exist, return to page with message
                    //var noId = {fail: 'Company No does not exist'};
                    res.redirect('/companies');
                }
            }, deleteCompanyId);
        }else{
            res.get('/companies');
        }
    });
}