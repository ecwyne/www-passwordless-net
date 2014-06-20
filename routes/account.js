'use strict';

var express = require('express');
var router = express.Router();
var passwordless = require('passwordless');
var User = require('../models/user');

/* GET logout. */
router.get('/logout', passwordless.logout(),
	function(req, res) {
  res.redirect('/');
});

/* POST login screen. */
router.post('/sendtoken', 
	// Input validation
	function(req, res, next) {
		req.checkBody('user', 'Please provide a valid email address').isLength(1,200).isEmail();
		req.sanitize('user').toLowerCase();
		req.sanitize('user').trim();

		var errors = req.validationErrors(true);
		if (errors) {
			req.flash('validation', errors);
			res.redirect('/');
		} else {
			next();
		}
	},
	// Request token
	passwordless.requestToken(
		function(email, delivery, callback) {
			// Return user, if she exists, create new if she doesn't
			User.findUser(email, function(error, user) {
				if(error) {
					callback(error.toString());
				} else if(user) {
					callback(null, user.id);
				} else {
					User.createOrUpdateUser(email, '', '', function(error, user) {
						if(error) {
							callback(error.toString());
						} else {
							callback(null, user.id);
						}
					})
				}
			})
		}, { failureRedirect: '/', failureFlash: 'We had issues sending out this email... Could you try it at a later moment?' }),
	function(req, res) {
		req.flash('success', 'You should have an email in your inbox any minute now...!');
  		res.redirect('/');
});

module.exports = router;