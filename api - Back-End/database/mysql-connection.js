//Dependencies
var mysql = require('mysql');

module.exports = {
    connection: function () {
        return mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'admin',
            database: 'fotr_database'
        });
    }

};