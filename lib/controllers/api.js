'use strict';
var Q = require('q'),
	config = require('../config/config'),
	_ = require('underscore'),
	request = require('request');

var request = request.defaults({
  followAllRedirects: true,
  gzip:true
});

exports.get = function(options,callback) {  

  request(options, function(error, response, body){
    if (!error && response.statusCode == 200) {
      return callback(null,response);
    }
    else
    {
      console.log('ERROR  '+body);
      return callback(error);
    }
  })
}
};

