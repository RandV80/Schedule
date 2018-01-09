var mysql = require('mysql');
var db = require('./connection');

var Session = {
    validateLogin: function(callback, email, pass){
        var sql = 'SELECT ??, ??, ??, ?? FROM ?? WHERE ?? = ?'
        var inserts = [
            //DB SELECT fields
            'MemberNo',
            'Email1',
            'Password',
            'UserSalt',
            //DB Table
            'member_information',
            //DB WHERE clause
            'Email1',       email
        ];
        sql = mysql.format(sql, inserts);

    }

    

};

module.exports = Session;