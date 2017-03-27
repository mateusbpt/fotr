//Dependencies
var mysql = require('mysql');

module.exports = {
    connection: function() {
        return mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'fotr_database'
        });
    }

};