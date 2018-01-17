var express = require('express');
var mysql = require('mysql');

var config = require('../config').getDbConnectionString();

var connection = mysql.createConnection({
    host    : config.host,
    user    : config.user,
    password: config.pass,
});

var app = module.exports = express.createServer();

var sqlDB = ('CREATE DATABASE IF NOT EXISTS ??');
var inserts = [
    'session'
]
sqlDB = mysql.format(sqlDB, inserts);

connection.query(sqlDB, function(err){
    if(err) throw err;
    connection.query('USE session', function(err){
        if(err) throw err;
        var sqlTbl = 'CREATE TABLE IF NOT EXISTS ?? ('
        +''
        +''
        +''
        +''
        +')',
    });
});
