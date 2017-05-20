
api = require('./lib/controllers/api.js');





var origin;
var departure;
var depDate;
var retDate;

var getFlights = { 
    method: 'GET',
    url: 'https://api.test.sabre.com/v1/shop/flights?origin='+origin+'&destination='+departure+'&departuredate='+depDate+'&returndate='+retDate+'&excludedcarriers=US%2CDL&outboundflightstops=0&inboundflightstops=0&onlineitinerariesonly=N&limit=3&offset=1&eticketsonly=N&sortby=totalfare&order=asc&sortby2=departuretime&order2=asc&pointofsalecountry=US',
    headers: 
    { 
        'Authorization':'Bearer T1RLAQIwc1AJ5GH/P2QQfnkGuF0RggIG2hAgdOCGfOe1a2ssQIfPJtY2AADAIDinsa9Revgw8tgP68fcjXmIX4BHmjQxj1Bs0LmK+hYrZRHfBQfuFamusocOfyL+5BtjYSEV/98+BwLRItpem8qZmkn/YQKNEyidTrp1o3RI3f3ZJ4sLVjCja9b2jo1O+VdUW6pgNVRMiJkvao4XmHib5tHbPHjBqs+smXc7sJ1cEBiZr4uMtQItJmeiElkXtaj9R+zw7t3qRNtEMtZvDnzh9nQMtWqzsgpd+miN9+dlKB4JF4E+OwYIoGV+3Ovn',
        'X-Originating-Ip':12.39.178.119 
    } };

api.get(getFlights, function (error,result){
    //result.dosomething
});




