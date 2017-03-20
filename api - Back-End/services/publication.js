//Database Configuration
var db = require('../database/mysql-connection').connection();

module.exports = {

    getPublicationById: function(id, callback) {
        return db.query('SELECT * FROM PUBLICATION WHERE ID=?', id, callback);
    }

};