'use strict';

var express = require('express'),
    router = require('express').Router();
var bodyParser = require('body-parser'); 

/**
 * Main application file
 */


// Default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./lib/config/config');

var app = express();

// Express settings
require('./lib/config/express')(app);

// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());


// Expose app
exports = module.exports = app;

