var mysql = require('mysql');
var config = require('../config').getDbConnectionString();

/*
module.exports = {
    connect : function(){
        var connection = mysql.createConnection({
            host    : config.host,
            user    : config.user,
            password: config.pass,
            database: config.db
        });

        return connection.connect();
    }
};
//var connection = require('./connect.js');

var mysql = require('mysql');
var config = require('../config').getDbConnectionString();
//var pool = mysql.createPool({ /** Implement Pool before going live */

//module.exports = function(connection){

var connection = mysql.createPool({
    host    : config.host,
    user    : config.user,
    password: config.pass,
    database: config.db
});

module.exports = connection;
/*
function Connection(){
    this.connection = mysql.createConnection({
        host    : 'localhost',
        user    : 'root',
        password: '1234',
        database: 'schedule'
    });
    
    this.connection.connect();
}
*/
//module.exports = new Connection();
