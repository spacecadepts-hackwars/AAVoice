'use strict';

var express = require('express'),
    path = require('path'),
    morgan=require('morgan'),
    errorhandler = require('errorhandler'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    config = require('./config');
  


  
/**
 * Express configuration
 */
module.exports = function(app) {


  var env = process.env.NODE_ENV || 'development';
  if ('development' == env) {
     app.use(require('connect-livereload')());

    // Disable caching of scripts for easier testing
    app.use(function noCache(req, res, next) {
      if (req.url.indexOf('/scripts/') === 0) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
      }
      next();
      app.use(express.static(path.join(config.root, '.tmp')));
      app.use(express.static(path.join(config.root, 'app')));
      app.use(errorhandler());
      app.set('views', config.root + '/app/views');
      var sess = {
        secret: 'hickorydickorydock',
        cookie: {}
      }
      app.use(cookieParser());
      app.use(session(sess));
    });
  }
  var env = process.env.NODE_ENV || 'production';
  if ('production' == env) {
    app.use(express.static(path.join(config.root, 'app')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('views', config.root + '/app/views');
    app.use(cookieParser());
    app.use(session({secret: 'hickorydickorydock'}));
  }
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());
    app.set('view engine', 'jade');
    // app.use(function(req, res, next){
    //   res.status(404).send('Sorry cant find that!');
    // });

    app.get('/', function (req, res) {
      res.send('Hello Brave New Automatic World!')
    });

   
};
