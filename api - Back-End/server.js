//Dependencies
var express = require('express');
var app = express();
var routes = express.Router();
var bodyParser = require('body-parser');

//Utils
var utils = require('./utils/security-utils');

//JSON POST Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//Services
var character = require('./services/character');
var movie = require('./services/movie');
var profile = require('./services/profile');
var publication = require('./services/publication');
var user = require('./services/user');

//Routes Character
routes.get('/character/:id?', function(req, res) {
    character.getCharacterById(req.params.id, function(err, rows) {
        if (err) {
            return res.status(500).json({ "message": "Error" });
        } else {
            return res.status(200).json(rows);
        };
    });
});

//Initial Route
routes.get('/', function(req, res) {
    res.send("Welcome to API FOTR!");
});
app.use('/api', routes);


//Server start
var server = app.listen(8080, function() {
    console.log("FOTR API CONNECTED AT PORT: %s", server.address().port);
});