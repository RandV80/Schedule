/*
var mysql = require('mysql');
var config = require('./config').getDbConnectionString;

var connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password  
})

connection.query('CREATE DATABASE IF NOT EXISTS session', function (err){
    if(err) throw(err);
    connection.query('USE session', function(err){
        if(err) throw err;
        connection.query('CREATE TABLE IF NOT EXISTS ')
    })
})
*/