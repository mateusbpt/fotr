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
    extended: true
}));

//Services
var character = require('./services/character');
var movie = require('./services/movie');
var profile = require('./services/profile');
var publication = require('./services/publication');
var user = require('./services/user');

//Character Routes
routes.get('/character/:id?', function (req, res) {
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

//User Routes
routes.get('/user/:id', function (req, res) {
    user.getUserById(req.params.id, function (err, rows) {
        if (err) {
            return res.status(500).json({
                "message": "Error"
            });
        }
        return res.status(200).json(rows);
    });
});

routes.post('/user', function (req, res) {
    user.getUserByEmail(req.body.email, function (err, rows) {
        if (err) {
            return res.status(500).json({
                "message": "Error"
            });
        }
        if (rows.length === 0) {
            var password = utils.encryptPassword(utils.generatePassword(req.body.email, req.body.password));
            var data = {
                "username": req.body.username,
                "email": req.body.email,
                "password": password,
                "profile_id": req.body.profile_id
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
        } else {
            return res.status(202).json({
                "message": "E-mail já existente, verifique"
            });
        }

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