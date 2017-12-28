var express = require('express');
var bodyParser = require('body-parser');
var cloudinary = require('cloudinary');
var mongoose = require('mongoose');
var cors = require('cors');
var socketio = require('socket.io');
var schedule = require('node-schedule');
var morgan = require('morgan');

var authenticationController = require('./server/controllers/authentication.js');
var tweetController = require('./server/controllers/tweets.js');
var userController = require('./server/controllers/users.js');

var app = express();

var mongoUrl = 'mongodb://localhost:27017/BitChow';
// var mongoUrl = 'mongodb://admin:6HQJzwwPm_!ksgsx@ds151355.mlab.com:51355/bitchow';

mongoose.connect(mongoUrl);

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/app', express.static(__dirname + '/app'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.post('/api/user/signup', authenticationController.signUp);
app.post('/api/user/login', authenticationController.logIn);

app.post('/api/user/postTweet', tweetController.postTweet);
app.get('/api/main/getAllTweets', tweetController.getTweets);
app.post('/api/user/getFollowableUsers', userController.getFollowableUsers);
app.post('/api/user/followUser', userController.followUser);

app.get('/', function (req, res) {
    res.sendFile('index.html', {
        "root": __dirname
    });
});

var server = app.listen(process.env.PORT || 8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('BitChow running at http://%s:%s...', host, port);
})