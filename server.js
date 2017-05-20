'use strict';

var express = require('express'),
    router = require('express').Router();
var bodyParser = require('body-parser'); 
var mastercard = require('./lib/controllers/mastercard.js');

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

app.listen(config.port, function () {
  console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
  // mastercard.sendPayment(amount,paymentDescription,expiraryMonth,expiraryYear,cardCVC,numb);
});

app.post("/auth", function (request, response) {
  console.log(request.body);
});


app.post("/token", function (request, response) {
  console.log(request.body);
});

app.get("/flights",function(request, response){
    // do something with id
    // send a response to user based on id
    var obj = { flight : test, Content : "content "};

    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(JSON.stringify(obj));
});



// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());


// Expose app
exports = module.exports = app;

