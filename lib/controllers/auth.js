var passport = require('passport');
    //user = require('../models/user');

exports.login = function (req, res) {
		console.log('logging in ', {user: req.user});
    res.render('index', {user: req.user});
};

exports.logout = function (req, res) {
    console.log('logging out');
    req.logout();
    //req.session.destroy();
    res.redirect('/login');
};
