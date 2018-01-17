var configValues = require('./config');
var configSessionValues = require('./configSession');

module.exports = {
    getDbConnectionString: function(){
         return configValues;
    },

    getSessionConnectionString: function(){
        return configSessionValues;
    }

    
}