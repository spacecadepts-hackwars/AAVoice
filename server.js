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
    var obj = { flight : 'test', Content : "content "};

    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(JSON.stringify(obj));
});


// console.log('hook request');

//     try {
//         var speech = 'empty speech';

//         if (req.body) {
//             var requestBody = req.body;

//             if (requestBody.result) {
//                 speech = '';

//                 if (requestBody.result.fulfillment) {
//                     speech += requestBody.result.fulfillment.speech;
//                     speech += ' ';
//                 }

//                 if (requestBody.result.action) {
//                     speech += 'action: ' + requestBody.result.action;
//                 }
//             }
//         }

//         console.log('result: ', speech);

//         return res.json({
//             speech: speech,
//             displayText: speech,
//             source: 'apiai-webhook-sample'
//         });
//     } catch (err) {
//         console.error("Can't process request", err);

//         return res.status(400).json({
//             status: {
//                 code: 400,
//                 errorType: err.message
//             }
//         });
//     }



// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());


// Expose app
exports = module.exports = app;

