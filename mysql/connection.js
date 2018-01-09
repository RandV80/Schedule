var mysql = require('mysql');
var config = require('../config').getDbConnectionString();

var connection = mysql.createPool({
    host    : config.host,
    user    : config.user,
    password: config.pass,
    database: config.db
});

module.exports = connection;
