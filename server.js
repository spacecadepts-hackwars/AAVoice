'use strict';

var express = require('express'),
    router = require('express').Router();
var bodyParser = require('body-parser'); 
var mastercard = require('./lib/controllers/mastercard.js');
api = require('./lib/controllers/api.js');

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
  api.get(getFlights, function (error,result){
    console.log(result);
	});
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


var getFlights = { 
    method: 'GET',
    url: 'https://api.test.sabre.com/v1/shop/flights?origin=JFK&destination=LAX&departuredate=2017-07-07&returndate=2017-07-10&excludedcarriers=US%2CDL&outboundflightstops=0&inboundflightstops=0&onlineitinerariesonly=N&limit=3&offset=1&eticketsonly=N&sortby=totalfare&order=asc&sortby2=departuretime&order2=asc&pointofsalecountry=US',
    headers: 
    { 
        'Authorization':'Bearer T1RLAQIwc1AJ5GH/P2QQfnkGuF0RggIG2hAgdOCGfOe1a2ssQIfPJtY2AADAIDinsa9Revgw8tgP68fcjXmIX4BHmjQxj1Bs0LmK+hYrZRHfBQfuFamusocOfyL+5BtjYSEV/98+BwLRItpem8qZmkn/YQKNEyidTrp1o3RI3f3ZJ4sLVjCja9b2jo1O+VdUW6pgNVRMiJkvao4XmHib5tHbPHjBqs+smXc7sJ1cEBiZr4uMtQItJmeiElkXtaj9R+zw7t3qRNtEMtZvDnzh9nQMtWqzsgpd+miN9+dlKB4JF4E+OwYIoGV+3Ovn',
        'X-Originating-Ip':12.39.178.119 
    } };



// Expose app
exports = module.exports = app;

