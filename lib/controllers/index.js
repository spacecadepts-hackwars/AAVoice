'use strict';

var path = require('path');

/**
 * Send partial, or 404 if it doesn't exist
 */
exports.partials = function(req, res) {
  var stripped = req.url.split('.')[0];
  var requestedView = path.join('./', stripped);
  res.render(requestedView, function(err, html) {
    if(err) {
	    console.log('Problem parsing view', {error: err});
      res.send(404);
    } else {
      res.send(html);
    }
  });
};

/**
 * Send our single page app
 */
exports.index = function(req, res) {
  res.render('index');
};
