//Dependencies
var md5 = require('md5');


//Password Salt
var salt = 'fotr';


module.exports = {
    comparePassword: function(passwordOne, passwordTwo) {
        return passwordOne === passwordTwo ? true : false;
    },

    //   generatePassword: function (email, password) {
    //     return email + salt + password;
    //  },

    encryptPassword: function(password) {
        return md5(password);
    }
};