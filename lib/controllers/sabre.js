var api = require('./api.js'),
Q = require('q');



var getFlights = {
    method: 'GET',
    url: '',
    headers:
    {
        'Authorization':'Bearer T1RLAQIwc1AJ5GH/P2QQfnkGuF0RggIG2hAgdOCGfOe1a2ssQIfPJtY2AADAIDinsa9Revgw8tgP68fcjXmIX4BHmjQxj1Bs0LmK+hYrZRHfBQfuFamusocOfyL+5BtjYSEV/98+BwLRItpem8qZmkn/YQKNEyidTrp1o3RI3f3ZJ4sLVjCja9b2jo1O+VdUW6pgNVRMiJkvao4XmHib5tHbPHjBqs+smXc7sJ1cEBiZr4uMtQItJmeiElkXtaj9R+zw7t3qRNtEMtZvDnzh9nQMtWqzsgpd+miN9+dlKB4JF4E+OwYIoGV+3Ovn',
        'X-Originating-Ip': "12.39.178.119"
    } 
}


var requestFlightInfo = function(origin,destination,departureDate,returnDate,depWindow) {
    var deferrer = Q.defer();
    var newUrl = 'https://api.test.sabre.com/v1/shop/flights?origin='+origin+'&destination='+destination+'&departuredate='+departureDate+'&returndate='+returnDate+'&outbounddeparturewindow='+depWindow+'&excludedcarriers=US%2CDL&outboundflightstops=0&inboundflightstops=0&onlineitinerariesonly=N&limit=3&offset=1&eticketsonly=N&sortby=totalfare&order=asc&sortby2=departuretime&order2=asc&pointofsalecountry=US';
    getFlights.url = newUrl;
    console.log(newUrl);
    var response = api.get(getFlights).then(function(response) {

        console.log('-------------------------------')
        var parsedJason = JSON.parse(response.body);
        console.log(response.body);
        
        //parse response return flight prices/numbers/s
        var flightOptions = [];
        var i;
        for (i=0;i<3;i++) {
            var currentFlightInfo = {};

            currentFlightInfo.totalFare = parsedJason.PricedItineraries[i].AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount;
            console.log('totalFare: ' + currentFlightInfo.totalFare);

            
            currentFlightInfo.flightNumber = parsedJason.PricedItineraries[i].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment[0].FlightNumber;
            console.log('flightNumber: ' + currentFlightInfo.flightNumber);

            currentFlightInfo.deptDateTime = parsedJason.PricedItineraries[i].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment[0].DepartureDateTime;
            console.log('depDateTime: ' + currentFlightInfo.deptDateTime);

            currentFlightInfo.arrivalDateTime = parsedJason.PricedItineraries[i].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment[0].ArrivalDateTime;
            console.log('arrivalDateTIme: ' + currentFlightInfo.arrivalDateTime);
            flightOptions.push(currentFlightInfo);
    }
        console.log(flightOptions);
        deferrer.resolve(flightOptions);
    });

    return deferrer.promise;
}

exports.requestFlightInfo = requestFlightInfo;
