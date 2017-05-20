'use strict';

var express = require('express'),
	sabre = require('./lib/controllers/sabre.js'),
    router = require('express').Router();
var bodyParser = require('body-parser'); 
var mastercard = require('./lib/controllers/mastercard.js'),
	mail = require('./lib/controllers/mail.js'),
api = require('./lib/controllers/api.js');

var api_ai_client_token = "044f3a213a9a4c4eb160038fe0c80f2f ";

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
  
  // mail.sendEmail(name, email, issued_date, flight_date, dep_time, dest_time, origin_city, dest_city, origin, dest, fare, taxes, total);
  // sabre.requestFlightInfo();
	var origin = 'DFW';
	var destination = 'LAX';
	var departureDate = new Date();
	departureDate.setDate(departureDate.getDate() + 10);
	var returnDate = new Date();
	returnDate.setDate(departureDate.getDate() + 1); 
	var depWindow = '09001200';
		sabre.requestFlightInfo(origin,destination,formatDate(departureDate),formatDate(returnDate),depWindow).then(function(data){
			console.log(data[0]);
			var flightInfo = data[0];
			var string = 'Flight AA'+flightInfo.flightNumber+' leaving '+origin+' at '+flightInfo.deptDateTime+ ' arriving at '+destination+' '+flightInfo.arrivalDateTime+' price is $'+flightInfo.totalFare;
			console.log('----------------!!!!!!!!!!!!!'+string);
		});
  //mail.sendEmail();
  //sabre.requestFlightInfo();

 //  api.get(getFlights, function (error,result){
 //    console.log(result);
	// });
  
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

var flightInfo='';
var departureDate = '';
var origin = '';
var destination = '';

// [START YourAction]
var yourAction = function(request, response) {
  console.log("HERE YOUR ACTION");	
  const googleapp = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));
  var reqBody = request.body.result.parameters;
  var sessionId = request.body.sessionId
  // Fulfill action business logic
  function flightResponseHandler (app) {

    // Complete your fulfillment logic and send a response

    //get entities

    	var returnDate = new Date();
  		origin = reqBody.airport_from;
  		destination = reqBody.airport_to;
  		departureDate = new Date(reqBody.dep_date);
		returnDate.setDate(departureDate.getDate() + 1); 
		var depWindow = reqBody.dep_time;
		depWindow = parseInt(depWindow.substring(0,2));
		var secondDepWindow = depWindow+6;
		depWindow = depWindow.toString()+'00'+secondDepWindow+'00';

		var formattedDep = formatDate(departureDate);
		var formattedRet = formatDate(returnDate);
		formattedDep = formattedDep.replace("T", " at ");
		formattedRet = formattedRet.replace("T", " at ");
		// var depWindow = '09001200';
		console.log(origin+' '+destination+' ' +formattedDep+ ' '+formattedRet+ ' '+depWindow);
  		sabre.requestFlightInfo(origin,destination,formatDate(departureDate),formatDate(returnDate),depWindow).then(function(data){
			//sendback data
			console.log(data[0]);
			var flightInfo = data[0];
			flightInfo.deptDateTime = flightInfo.deptDateTime.replace("T", " at ");
			flightInfo.arrivalDateTime = flightInfo.arrivalDateTime.replace("T", " at ");
			flightInfo.deptDateTime = flightInfo.deptDateTime.substring(0,18);
			flightInfo.arrivalDateTime = flightInfo.arrivalDateTime.substring(0,18);

			var string = 'Flight AA'+flightInfo.flightNumber+' leaving '+origin+' at '+flightInfo.deptDateTime+ ' arriving at '+destination+' '+flightInfo.arrivalDateTime+' price is $'+flightInfo.totalFare+'.';
			var ask = 'This is the lowest fare at your preferences. Do you want to purchase this flight?';
			console.log(string);
			googleapp.ask(string+ask);

		}).catch(function (error) {
    		googleapp.ask("Sorry we dont have any flights at this time");
		}).done();
    
  }

  function flightPicked (app) {
  	console.log('FlightPicked');
  	var confirm = reqBody.confirmResponse;
  	if(confirm)
  	{
  		console.log("FLIGHT PICKED");
  		mastercard.sendPayment(flightInfo.totalFare,"Flight",'11','19','123','5555555555554444');
  		var currentDate = new Date();
  		var taxes = '11.23';
  		var total = flightInfo.totalFare +taxes;
  		mail.sendEmail("John Mackoy", "harrib4@gmail.com", currentDate.toString(), departureDate, flightInfo.deptDateTime, flightInfo.arrivalDateTime, origin, destination, origin, destination, flightInfo.totalFare, '11.23', total);
  		googleapp.ask("Booking confirmed. A confirmation email with your trip details will be sent shortly. Is there anything else I can help you with?");
  	}
  	else
  	{
  		googleapp.ask('Thank you for choosing American Airlines. Have a great flight');
  	}
    //do payment
    //send Email
  }

  const actionMap = new Map();
  actionMap.set('BookFlights', flightResponseHandler);
  actionMap.set('BookFlightsFrom.BookFlightsFrom-yes', flightPicked);

  googleapp.handleRequest(actionMap);
};


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}



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
// var test = [ { totalFare: '366.40',
//     flightNumber: 23,
//     deptDateTime: '2017-07-07T05:50:00',
//     arrivalDateTime: '2017-07-07T08:44:00' },
//   { totalFare: '366.40',
//     flightNumber: 171,
//     deptDateTime: '2017-07-07T06:00:00',
//     arrivalDateTime: '2017-07-07T09:10:00' },
//   { totalFare: '366.40',
//     flightNumber: 171,
//     deptDateTime: '2017-07-07T06:00:00',
//     arrivalDateTime: '2017-07-07T09:10:00' } ];
//     test.forEach(function (flight){
//     	var string = 'Flight AA'+flight.flightNumber+ 'leaving DFW'+ flight.deptDateTime+'arriving at LAX'+ flight.arrivalDateTime+' price is $'+flight.totalFare;
//     	//googleapp.ask(string);
//     	console.log(string);
//     });
exports = module.exports = app;

