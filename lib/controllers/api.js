'use strict';
var Q = require('q'),
	config = require('../config/config'),
	request = require('request');

var request = request.defaults({
  followAllRedirects: true,
  gzip:true
});

exports.get = function(options,callback) {  
  var deferrer = Q.defer();
  request(options, function(error, response, body){
    if (!error && response.statusCode == 200) {
      console.log('here');
      deferrer.resolve(response);
    }
    else
    {
      console.log('ERROR  '+body);
      deferrer.reject(body);
    }
  })
  return deferrer.promise;
};

