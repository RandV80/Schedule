var mysql = require('mysql');
var db = require('./connection');

var Members = {
    getAllMembers: function(callback){
        var sql = "SELECT ??, ??, ??, ??, DATE_FORMAT(??,'%Y-%m-%d') as MemberBirthday, ??, ??, ?? FROM ?? order by ??";
        //var sql = "SELECT ??, ??, ??, ??, ??, ??, ??, ?? FROM ?? order by ??";
        var inserts = [
            'MemberNo','MemberFirstName','MemberLastName', 
            'MemberNickName','MemberBirthday',
            'HomePhone','WorkPhone','CellPhone',
            'member_information', 'MemberNo'];
        sql = mysql.format(sql, inserts);
        return db.query(sql, callback);
    },
    getMemberById: function(callback, id){
        var sql ="SELECT ??,??,??,??,??,??," + 
        "DATE_FORMAT(??,'%Y-%m-%d') as MemberBirthday," +
        "??,??,??,??,??,??,??,??,??,??,??,??,??,??," + 
        "DATE_FORMAT(??,'%Y-%m-%d') as ProgramStartDate," + 
        "??,??,??,??,??,??,??,??,??,??,??,??,??,??,??" + 
        " from ?? WHERE ?? = ?";
        var inserts = [
            //DB SELECT fields
            'CompanyNo',
            'MemberNo',
            'MemberFirstName',
            'MemberMiddleName',
            'MemberLastName',
            'MemberNickName',
            'MemberBirthday',
            'FamilyGrouping',
            'City',
            'ProvinceState',
            //Postal Code?
            'Country',        
            'TimeZone',
            'FirstLanguage',
            'SecondLanguage',
            'ThirdLanguage',
            'FourthLanguage',
            'Email1',
            'Email2',
            'HomePhone',
            'WorkPhone',
            'CellPhone',
            'ProgramStartDate',
            'ProgramParticipant',
            'Volunteer',
            'Guide',
            'WeeklyPracticumHours',
            'BuddyNo',
            'Status',
            'UserID', //change ID to Id
            'Password',
            'UserSalt',
            'AccountingSystemUserID', //change ID to Id
            'eDiscountPercent',
            'CreditHours',
            'SchedulingEmailNotification',
            'TaskManagementEmailNotification',
            'SecurityLevel',            
            //DB Table
            'member_information',
            //DB WHERE clause
            'MemberNo',     id
        ];    
        sql = mysql.format(sql, inserts); 
        return db.query(sql, callback);
    },

    addMember: function updateMember(callback, data, connection){
        var sql = 'INSERT INTO ?? ' + 
        '(??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??) ' +
        'VALUES ' + 
        '(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);'
        var inserts = [
            //table
            'member_information',
            //DB fields
            'CompanyNo',
            'MemberNo',
            'MemberFirstName',
            'MemberMiddleName',
            'MemberLastName',
            'MemberNickName',
            'MemberBirthday',
            'FamilyGrouping',
            'City',
            'ProvinceState',
            //Postal Code?
            'Country',        
            'TimeZone',
            'FirstLanguage',
            'SecondLanguage',
            'ThirdLanguage',
            'FourthLanguage',
            'Email1',
            'Email2',
            'HomePhone',
            'WorkPhone',
            'CellPhone',
            'ProgramStartDate',
            'ProgramParticipant',
            'Volunteer',
            'Guide',
            'WeeklyPracticumHours',
            'BuddyNo',
            'Status',
            'UserID', //change ID to Id
            'Password',
            'UserSalt',
            'AccountingSystemUserID', //change ID to Id
            'eDiscountPercent',
            'CreditHours',
            'SchedulingEmailNotification',
            'TaskManagementEmailNotification',
            'SecurityLevel',
            //data
            data._companyno,
            data._memberno,
            data._memberfirstname,
            data._membermiddlename,
            data._memberlastname,
            data._membernickname,
            data._birthday,
            data._familygrouping,
            data._city,
            data._provincestate,
            data._country,        
            data._timezone,
            data._firstlanguage,
            data._secondlanguage,
            data._thirdlanguage,
            data._fourthlanguage,
            data._email1,
            data._email2,
            data._homephone,
            data._workphone,
            data._cellphone,
            data._programstartdate,
            data._programparticipant,
            data._volunteer,
            data._guide,
            data._weeklypracticumhours,
            data._buddyno,
            data._status,
            data._userid,
            data._password,
            'USERSALT', //to be implemented
            data._accountingsystemuserid,            
            data._ediscountpercent,
            data._credithours,
            data._schedulingemailnotification,
            data._taskmanagementemailnotification,
            data._securitylevel        
        ];
        sql = mysql.format(sql, inserts);
        
        //console.log('sql: ' + sql);

        return db.query(sql, callback, data);
    
    },

    updateMemberDetails: function(callback, data){
        var sql = 'UPDATE ?? SET ' + 
            '?? = ?,' + // First Name
            '?? = ?,' + // Middle Name
            '?? = ?,' + // Last Name
            '?? = ?,' + // Nick Name
            '?? = ?,' + // Birthday
            '?? = ?,' + // Family Grouping
            '?? = ?,' + // City
            '?? = ?,' + // Province/State
            '?? = ?,' + // Country
            '?? = ?,' + // Time Zone
            '?? = ?,' + // First Language
            '?? = ?,' + // Second Language
            '?? = ?,' + // Third Language
            '?? = ?,' + // Fourth Language
            '?? = ?,' + // Home Phone
            '?? = ?,' + // Work Phone
            '?? = ?,' + // Cell Phone
            '?? = ?,' + // Email 1
            '?? = ? ' + // Email 2
            'WHERE ?? = ?';

        var inserts = [
            'member_information',
            'MemberFirstName',  data._firstName,
            'MemberMiddleName', data._middleName,
            'MemberLastName',   data._lastName,
            'MemberNickName',   data._nickName,
            'MemberBirthday',   data._birthday,
            'FamilyGrouping',   data._familyGrouping,
            'City',             data._city,
            'ProvinceState',     data._provState,
            'Country',          data._country,
            'TimeZone',         data._timeZone,
            'FirstLanguage',    data._firstLanguage,
            'SecondLanguage',   data._secondLanguage,
            'ThirdLanguage',    data._thirdLanguage,
            'FourthLanguage',    data._fourthLanguage,
            'HomePhone',        data._homePhone,
            'WorkPhone',        data._workPhone,
            'CellPhone',        data._cellPhone,
            'Email1',           data._email1,
            'Email2',           data._email2,
            'MemberNo',         data._memberNo
        ];
        sql = mysql.format(sql, inserts);

        console.log('SQL: ' + sql);
        return db.query(sql, callback, data);
    },

    updateMemberPrograms: function(callback, data){
        console.log('data: ' + JSON.stringify(data));
        var sql = 'UPDATE ?? SET ' + 
            '?? = ?,' + // Program Participant
            '?? = ?,' + // Program State Date
            '?? = ?,' + // Buddy Member No
            '?? = ?,' + // Guide
            '?? = ?,' + // Volunteer
            '?? = ? ' + // Status
            'WHERE ?? = ?';

        var inserts = [
            'member_information',
            'ProgramParticipant',   data._programParticipant,
            'ProgramStartDate',     data._programStartDate,
            'BuddyNo',              data._buddyMemberNo,
            'Guide',                data._guide,
            'Volunteer',            data._volunteer,
            'Status',               data._status,
            'MemberNo',             data._memberNo
        ];
        sql = mysql.format(sql, inserts);

        console.log('SQL: ' + sql);
        return db.query(sql, callback, data);
    },
    
    updateMemberSettings: function(callback, data){
        console.log('data: ' + JSON.stringify(data));
        var sql = 'UPDATE ?? SET ' + 
            '?? = ?,' + // Password
            '?? = ?,' + // Scheduleing Email Notification
            '?? = ?,' + // Task Email Notification
            '?? = ? ' + // Security Level
            'WHERE ?? = ?';

        var inserts = [
            'member_information',
            'Password',                         data._password,
            'SchedulingEmailNotification',      data._schedulingEmailNotifaction,
            'TaskManagementEmailNotification',  data._taskEmailNotification,
            'SecurityLevel',                    data._securityLevel,
            'MemberNo',                         data._memberNo
        ];
        sql = mysql.format(sql, inserts);

        console.log('SQL: ' + sql);
        return db.query(sql, callback, data);
    },
    
    deleteMember: function(callback, deleteId, data){
        var sql = 'DELETE from ?? WHERE ?? = ?'
        var inserts = [
            'member_information',
            'MemberNo',
            deleteId
        ];
        sql = mysql.format(sql, inserts);
        console.log('delete sql: ' + sql);
        return db.query(sql, callback, data);
    }
};

module.exports = Members;