//Database Configuration
var db = require('../database/mysql-connection').connection();

module.exports = {

    getAll: function () {
        return db.query('SELECT * FROM USER', [], callback);
    },

    getUserById: function (id, callback) {
        return db.query('SELECT * FROM USER WHERE ID=?', id, callback);
    },

    getUserByEmail: function (email, callback) {
        return db.query('SELECT * FROM USER WHERE EMAIL=?', email, callback);
    },

    followersCount: function (id, callback) {
        return db.query('SELECT COUNT(*) FROM USER_HAS_FRIEND WHERE USER_FRIEND_ID=?', id, callback);
    },

    followingCount: function (id, callback) {
        return db.query('SELECT COUNT(*) FROM USER_HAS_FRIEND WHERE USER_ID=?', id, callback);
    },

    addUser: function (user, callback) {
        return db.query('INSERT INTO USER SET ?', [user], callback);
    },

    addFollow: function (follow) {
        return db.query('INSERT INTO USER_HAS_FRIEND SET ?', [follow], callback);
    },

    removeFollow: function (idUser, idFollow) {
        return db.query('DELETE FROM USER_HAS_FRIEND WHERE USER_ID=? AND USER_FRIEND_ID=?', idUser, idFollow, callback);
    }
};