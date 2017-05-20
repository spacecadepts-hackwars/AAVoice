'use strict';

var express = require('express'),
	sabre = require('./lib/controllers/sabre.js'),
    router = require('express').Router();
var bodyParser = require('body-parser'); 
var mastercard = require('./lib/controllers/mastercard.js'),
	mail = require('./lib/controllers/mail.js'),
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

  var name = 'Kevin Chi';
  var email;
  var issued_date = 'May 20, 2017';
  var flight_date = 'Saturday, May 27, 2017';
  var dep_time;
  var dest_time;
  var origin_city = 'Austin';
  var dest_city = 'San Francisco';
  var origin = 'AUS';
  var dest = 'SFO';
  var fare = '100.45';
  var taxes = '12.00';
  var total = '112.45';
  
  mail.sendEmail(name, email, issued_date, flight_date, dep_time, dest_time, origin_city, dest_city, origin, dest, fare, taxes, total);
  // sabre.requestFlightInfo();

  //mail.sendEmail();
  //sabre.requestFlightInfo();

 //  api.get(getFlights, function (error,result){
 //    console.log(result);
	// });
  // mastercard.sendPayment(amount,paymentDescription,expiraryMonth,expiraryYear,cardCVC,numb);
});

app.post("/auth", function (request, response) {
  console.log(request.body);
});


app.post("/token", function (request, response) {
  console.log(request.body);
});

app.post("/flights",function(request, response){
	console.log('flightssss :)');
    // do something with id
    // send a response to user based on id
    yourAction(request,response);
});


// console.log('hook request');

const App = require('actions-on-google').ApiAiApp;

// [START YourAction]
var yourAction = function(request, response) {
  console.log("HERE YOUR ACTION");	
  const googleapp = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  // Fulfill action business logic
  function responseHandler (app) {

  	console.log("HEREEEEEEEEEEEEEEE");
    // Complete your fulfillment logic and send a response

    //get entities
  //   var test = [ { totalFare: '366.40',
  //   flightNumber: 23,
  //   deptDateTime: '2017-07-07T05:50:00',
  //   arrivalDateTime: '2017-07-07T08:44:00' },
  // { totalFare: '366.40',
  //   flightNumber: 171,
  //   deptDateTime: '2017-07-07T06:00:00',
  //   arrivalDateTime: '2017-07-07T09:10:00' },
  // { totalFare: '366.40',
  //   flightNumber: 171,
  //   deptDateTime: '2017-07-07T06:00:00',
  //   arrivalDateTime: '2017-07-07T09:10:00' } ];

  //   test.forEach(function (flight){
  //   	var string = 'Flight AA'+flight.flightNumber+ 'leaving DFW'+ flight.deptDateTime+'arriving at LAX'+ flight.arrivalDateTime+' price is $'+flight.totalFare;
  //   	googleapp.ask(string);
  //   	console.log(string);
  //   });
  		googleapp.ask('Flight AA23leaving DFW2017-07-07T05:50:00arriving at LAX2017-07-07T08:44:00 price is $366.40');
  		googleapp.ask('Flight AA171leaving DFW2017-07-07T06:00:00arriving at LAX2017-07-07T09:10:00 price is $366.40');
    
  }

  const actionMap = new Map();
  actionMap.set('showflights', responseHandler);

  googleapp.handleRequest(actionMap);
};



// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());


// var getFlights = { 
//     method: 'GET',
//     url: 'https://api.test.sabre.com/v1/shop/flights?origin=JFK&destination=LAX&departuredate=2017-07-07&returndate=2017-07-10&excludedcarriers=US%2CDL&outboundflightstops=0&inboundflightstops=0&onlineitinerariesonly=N&limit=3&offset=1&eticketsonly=N&sortby=totalfare&order=asc&sortby2=departuretime&order2=asc&pointofsalecountry=US',
//     headers: 
//     { 
//         'Authorization':'Bearer T1RLAQIwc1AJ5GH/P2QQfnkGuF0RggIG2hAgdOCGfOe1a2ssQIfPJtY2AADAIDinsa9Revgw8tgP68fcjXmIX4BHmjQxj1Bs0LmK+hYrZRHfBQfuFamusocOfyL+5BtjYSEV/98+BwLRItpem8qZmkn/YQKNEyidTrp1o3RI3f3ZJ4sLVjCja9b2jo1O+VdUW6pgNVRMiJkvao4XmHib5tHbPHjBqs+smXc7sJ1cEBiZr4uMtQItJmeiElkXtaj9R+zw7t3qRNtEMtZvDnzh9nQMtWqzsgpd+miN9+dlKB4JF4E+OwYIoGV+3Ovn',
//         'X-Originating-Ip':12.39.178.119 
//     } };



// Expose app
var test = [ { totalFare: '366.40',
    flightNumber: 23,
    deptDateTime: '2017-07-07T05:50:00',
    arrivalDateTime: '2017-07-07T08:44:00' },
  { totalFare: '366.40',
    flightNumber: 171,
    deptDateTime: '2017-07-07T06:00:00',
    arrivalDateTime: '2017-07-07T09:10:00' },
  { totalFare: '366.40',
    flightNumber: 171,
    deptDateTime: '2017-07-07T06:00:00',
    arrivalDateTime: '2017-07-07T09:10:00' } ];
    test.forEach(function (flight){
    	var string = 'Flight AA'+flight.flightNumber+ 'leaving DFW'+ flight.deptDateTime+'arriving at LAX'+ flight.arrivalDateTime+' price is $'+flight.totalFare;
    	//googleapp.ask(string);
    	console.log(string);
    });
exports = module.exports = app;

