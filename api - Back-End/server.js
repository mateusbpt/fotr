//Dependencies
var express = require('express');
var app = express();
var routes = express.Router();
var bodyParser = require('body-parser');

//Utils
var utils = require('./utils/security-utils');

//JSON POST Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//Services
var character = require('./services/character');
var movie = require('./services/movie');
var profile = require('./services/profile');
var publication = require('./services/publication');
var user = require('./services/user');

//Character Routes
routes.get('/characters/:id?', function (req, res) {
    character.getCharacterById(req.params.id, function (err, rows) {
        if (err) {
            return res.status(500).json({
                "message": "Error"
            });
        } else {
            return res.status(200).json(rows);
        }
    });
});

routes.get('/characters', function (req, res) {
    character.getAll(function (err, rows) {
        if (err) {
            return res.status(500).json({
                "message": "Error"
            });
        } else {
            return res.status(200).json(rows);
        }
    });
});

//Movie Routes

//Profile Routes

//Publication Routes

//User Routes
routes.get('/users/:id', function (req, res) {
    user.getUserById(req.params.id, function (err, rows) {
        if (err) {
            return res.status(500).json({
                "message": "Error"
            });
        }
        return res.status(200).json(rows[0]);
    });
});

routes.post('/signup', function (req, res) {
    var data;
    user.getUserByEmail(req.body.email, function (err, rows) {
        if (err) {
            return res.status(500).json({
                "message": "Error"
            });
        }
        if (rows.length === 0) {
            var password = utils.encryptPassword(utils.generatePassword(req.body.email, req.body.password));
            data = {
                "username": req.body.username,
                "email": req.body.email,
                "password": password,
                "profile_id": req.body.profile_id
            }
        } else {
            return res.status(202).json({
                "message": "E-mail já existente, verifique"
            });
        }
        console.log(data);
        user.addUser(data, function (err) {
            if (err) {
                return res.status(500).json({
                    "message": "Error"
                });
            }
            return res.status(200).json({
                "message": "Cadastro Realizado com Sucesso"
            });
        });
    });
});

routes.post('/signin', function (req, res) {
    var data = {
        "email": req.body.email,
        "password": req.body.password
    }
    user.getUserByEmail(data.email, function (err, rows) {
        if (err) {
            return res.status(500).json({
                "message": "Error"
            });
        }
        if (rows.length === 0) {
            return res.status(202).json({
                "encontrado": false
            });
        } else {
            var password = utils.encryptPassword(utils.generatePassword(data.email, data.password));
            return utils.comparePassword(rows[0].password, password) ?
                res.status(200).json({
                    "logado": true,
                    "id": rows[0].id
                }) :
                res.status(202).json({
                    "logado": false
                });

        }
    });
});

routes.post('/edit/:id', function (req, res) {
    user.getUserById(req.params.id, function (err, rows) {
        if (err) {
            return res.status(500).json({
                "message": "Error"
            })
        }
        if (rows.length === 0) {
            return res.status(202).json({
                "message": "Usuário não encontrado"
            })
        }
        var password = utils.encryptPassword(utils.generatePassword(rows[0].email, req.body.password));
        var data = {
            "username": req.body.username,
            "password": password,
            "profile_id": req.body.profile_id
        }

        console.log(data);
        user.editProfile(data, req.params.id, function (err) {
            if (err) {
                return res.status(500).json({
                    "message": "Error"
                })
            }
            return res.status(200).json({
                "message": "Cadastro editado com sucesso"
            })
        });

    });
});

routes.get('/countFollowing/:id', function (req, res) {
    user.followingCount(req.params.id, function (err, rows) {
        if (err) {
            return res.status(500).json({
                "message": "Error"
            });
        }
        return res.status(200).json(rows[0]);
    });
});

routes.get('/countFollowers/:id', function (req, res) {
    user.followersCount(req.params.id, function (err, rows) {
        if (err) {
            return res.status(500).json({
                "message": "Error"
            });
        }
        return res.status(200).json(rows[0]);
    });
});

routes.post('/removeFollow', function (req, res) {
    var data = {
        "user_id": req.body.user_id,
        "user_friend_id": req.body.user_friend_id
    };
    user.removeFollow(data.user_id, data.user_friend_id, function (err, rows) {
        if (err) {
            return res.status(500).json({
                "message": "Error"
            });
        }
        if (rows.length === 0) {
            return res.status(202).json({
                "message": "Você não segue esse usuário"
            });
        }
        return res.status(200).json({
            "message": "Você deixou de seguir"
        });
    });
});

routes.post('/addfollow', function (req, res) {
    var data = {
        "user_id": req.body.user_id,
        "user_friend_id": req.body.user_friend_id
    };
    console.log(data);
    user.findFollow(data.user_id, data.user_friend_id, function (err, rows) {
        if (err) {
            return res.status(500).json({
                "message": "Error"
            });
        }
        if (rows.length !== 0) {
            return res.status(202).json({
                "message": "Você já segue essa pessoa"
            });
        }
    });
    user.addFollow(data, function (err) {
        if (err) {
            return res.status(500).json({
                "message": "Error"
            });
        }
        return res.status(200).json({
            "message": "Seguiu com Sucesso"
        });
    });
});

//Initial Route
routes.get('/', function (req, res) {
    res.send("Welcome to API FOTR!");
});
app.use('/api', routes);

//Server start
var server = app.listen(8080, function () {
    console.log("FOTR API connected at port: %s", server.address().port);
});