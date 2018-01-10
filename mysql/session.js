var mysql = require('mysql');
var db = require('./connection');

var Session = {
    getLogin: function( callback, user){
        var sql = 'SELECT ??, ??, ??, ?? FROM ?? WHERE ?? = ?'
        var inserts = [
            //DB SELECT fields
            'MemberNo',
            'UserId',
            'Password',
            'UserSalt',
            //DB Table
            'member_information',
            //DB WHERE clause
            'UserId',       user
        ];

        sql = mysql.format(sql, inserts);
        return db.query(sql, callback);
        /*
        sql = mysql.format(sql, inserts);
        console.log('sql: ' + sql);
        db.query(sql, function (err, results, fields){
            if (err) throw err;
            console.log('results: ' + JSON.stringify(results));
            if(Object.keys(results).length !== 0){
                if (pass === results[0].Password){
                    console.log('Login success');
                }else{
                    console.log('Login failed');
                }
                
            }else{
                console.log('results: User not found');
            }
        });*/
    }
};

module.exports = Session;