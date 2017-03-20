//Database Configuration
var db = require('../database/mysql-connection').connection();

module.exports = {

    getUserById: function(id, callback) {
        return db.query('SELECT * FROM USER WHERE ID=?', id, callback);
    }

};