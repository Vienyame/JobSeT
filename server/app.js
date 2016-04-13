/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
        console.error('MongoDB connection error: ' + err);
        process.exit(-1);
    }
);
// Populate DB with sample data
//if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
//CORS defenition
var corsDomain = '';
var enableCORS = function(req, res, next) {
    corsDomain = req.headers.origin; //  affect with origin url  LOAD BALANCING DEMO : CHECK IF PROBE IS OK
    res.header('Access-Control-Allow-Origin', corsDomain);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, authorization, Origin,X-Requested-With,Accept, Authorization');
    res.header('Access-Control-Allow-Credentials','true');
    //res.header('Content-Type', 'application/json');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
};
// enable CORS!
app.use(enableCORS);

var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
    serveClient: config.env !== 'production',
    path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
