var mysql = require('mysql');
var db = require('./connection');
/*
function checkExistingCompanyId(callback, companyId, connection){
    var sql = 'SELECT * FROM ?? WHERE ?? = ?';
    var inserts = [
        'company_table',
        'companyNo',
        companyId
    ];

    sql = mysql.format(sql, inserts);
    var result = '';
    connection.query(sql, function(error, results, fields){
        if (error) throw error;
        callback(results);
    });
}
*/
var Companies = {
    getAllCompanies: function(callback){
        var sql = 'SELECT * from ??';
        var inserts = [
            'company_table',
        ];
        sql = mysql.format(sql, inserts);
        return db.query(sql, callback);
    },
    getCompanyById: function(callback, id){
        console.log ('check id: ' + id)
        var sql = 'SELECT * from ?? WHERE ?? = ?';
        var inserts = [
            'company_table',
            'CompanyNo',
            id
        ];    
        sql = mysql.format(sql, inserts);
        return db.query(sql, callback);
    },
    addCompany: function(callback, data){
        //checkExistingCompanyId
        var sql = 'INSERT INTO ?? VALUES (?, ?);'
        var inserts = [
            'company_table',
            data._companyNo,
            data._companyDescription
        ];
        sql = mysql.format(sql, inserts);  
        return db.query(sql, callback, data);
    },

    updateCompany: function(callback, data){
        //console.log('Data: ' + JSON.stringify(data));
        var sql = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
        var inserts = [
            'company_table',
            'Description',      data._companyDescription,
            'CompanyNo',        data._companyNo
        ];
        sql = mysql.format(sql, inserts);
        
        console.log('SQL:' + sql);
        return db.query(sql, callback, data);
    },

    deleteCompany: function(callback, deleteId, data){
            var sql = 'DELETE from ?? WHERE ?? = ?';
            var inserts = [
                'company_table',
                'companyNo',
                deleteId
            ];
            sql = mysql.format(sql, inserts);
            return db.query(sql, callback, data);
    }
    /*,

function deleteCompany(callback, deleteId, connection){
    var sql = 'DELETE from ?? WHERE ?? = ?';
    var inserts = [
        'company_table',
        'companyNo',
        deleteId
    ];
    sql = mysql.format(sql, inserts);
    console.log ('sql:' + sql);
    
    connection.query(sql, function(error, results, fields){
        if (error) throw error;
        callback(results);
    });
}    
    checkExistingCompanyId: function(callback, companyId){
        var sql = 'SELECT * FROM ?? WHERE ?? = ?';
        var inserts = [
            'company_table',
            'companyNo',
            companyId
        ];
    
        sql = mysql.format(sql, inserts);        
    }
    */
};

module.exports = Companies;