//Database Configuration
var db = require('../database/mysql-connection').connection();

module.exports = {

    getProfileById: function (id, callback) {
        return db.query('SELECT * FROM PROFILE WHERE ID=?', id, callback);
    },

    getAll: function (callback) {
        return db.query('SELECT * FROM PROFILE', [], callback);
    }

};