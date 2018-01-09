var configValues = require('./config');

module.exports = {
    getDbConnectionString: function(){
         return configValues;
    },

    getSessionConnectionString: function(){
        return configSessionValues;
    }

    
}