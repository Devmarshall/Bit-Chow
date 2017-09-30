var express = require('express');
var bodyParser = require('body-parser');
var cloudinary = require('cloudinary');
var mongoose = require('mongoose');
var cors = require('cors');
var socketio = require('socket.io');
var schedule = require('node-schedule');
var morgan = require('morgan');

var app = express();

// mongoose.connect('mongodb://localhost:27017/BitChow');

app.use(bodyParser.json());
app.use('/app', express.static(__dirname + '/app'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));


app.get('/', function (req, res) {
    res.sendFile('index.html', {
        "root": __dirname
    });
});

var server = app.listen(3003, 'localhost', function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Server running...');
    console.log('Listening at http://%s:%s...', host, port);
})