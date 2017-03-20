//Database Configuration
var db = require('../database/mysql-connection').connection();

module.exports = {

    getMovieById: function(id, callback) {
        return db.query('SELECT * FROM MOVIE WHERE ID=?', id, callback);
    }

};