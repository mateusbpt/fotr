//Database Configuration
var db = require('../database/mysql-connection').connection();

module.exports = {

    getCharacterById: function(id, callback) {
        return db.query('SELECT * FROM `CHARACTER` WHERE ID=?', id, callback);
    }

};