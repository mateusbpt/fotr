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
        return db.query('SELECT COUNT(*) AS followers FROM USER_HAS_FRIEND WHERE USER_FRIEND_ID=?', id, callback);
    },

    followingCount: function (id, callback) {
        return db.query('SELECT COUNT(*) AS following FROM USER_HAS_FRIEND WHERE USER_ID=?', id, callback);
    },

    addUser: function (user, callback) {
        return db.query('INSERT INTO USER SET ?', [user], callback);
    },

    addFollow: function (follow, callback) {
        return db.query('INSERT INTO USER_HAS_FRIEND SET ?', [follow], callback);
    },

    findFollow: function (idUser, idFollow, callback) {
        return db.query('SELECT * FROM USER_HAS_FRIEND WHERE USER_ID=? AND USER_FRIEND_ID=?', [idUser, idFollow], callback);
    },

    removeFollow: function (idUser, idFollow, callback) {
        return db.query('DELETE FROM USER_HAS_FRIEND WHERE USER_ID=? AND USER_FRIEND_ID=?', [idUser, idFollow], callback);
    },

    editProfile: function (user, id, callback) {
        return db.query('UPDATE USER SET USERNAME=?, PASSWORD=?, PROFILE_ID=? WHERE ID=?', [user.username, id], callback);
    }
};