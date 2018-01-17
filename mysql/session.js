var mysql = require('mysql');
var db = require('./connection');

var Session = {
    getLogin: function( callback, user){
        var sql = 'SELECT ??, ??, ??, ??, ?? FROM ?? WHERE ?? = ?'
        var inserts = [
            //DB SELECT fields
            'MemberNo',
            'UserId',
            'Password',
            'UserSalt',
            'SecurityLevel',
            //DB Table
            'member_information',
            //DB WHERE clause
            'UserId',       user
        ];

        sql = mysql.format(sql, inserts);
        return db.query(sql, callback);
    }
};

module.exports = Session;