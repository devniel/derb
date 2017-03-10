var express = require('express');
var http = require('http');
var path = require('path');
var env = require("./config/env")[process.env.NODE_ENV || 'development'];

/**
 * debr - devniel's express boilerplate for react.js
 * @author : Daniel (devnieL) Flores
 * 2017
*/

global.version = "0.0.1";
global.rootDirectory = path.resolve(__dirname);

// Set app
var app = express();

require("./config/express")(app);

// Start the app by listening on port
var port = process.env.PORT || 3000;

// Log events
console.log("React project started on port: " + port);

// Start server
var server = http.createServer(app);
server.listen(port);

// Expose app for testing
exports = module.exports.app = server;
