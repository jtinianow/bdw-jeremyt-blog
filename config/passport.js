
var LocalStrategy	= require('passport-local').Strategy;
var user 			= require('../app/models/user');

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  passport = require('passport');


module.exports = function (passport) {

	// passport session setup
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});


	// LOCAL SIGNUP
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function (req, email, password, done) {
		// check to see if the user has already signed up
		User.findOne({'email': email}, function (err, user) {
			if (err) return done(err);

			// check for existing email
			if (user) {
				return done (null, false, req.flash('signupMessage', 'That email is already taken.'));
			} else {

				// create the user
				var newUser			= new User();

				// set the user's local cred
				newUser.local.email		= email;
				newUser.local.password 	= newUser.generateHash(password); // generate has of input

				// save the user
				newUser.save( function(err) {
					if (err) throw err;
					return done (null, newUser);
				});
			}
		});
	}));

	// LOCAL LOGIN
	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true //to pass back entire request to callback
	},
	function (req, email, password, done) { //callback with email and password from form
		// find a user whose email matches the form
		User.findOne({'local.email' : email}, function (err, user) {
			if (err) return done(err);
			console.log('part one');

			// if no user is found
			if (!user)
				return done(null, false, req.flash('loginMessage', 'No user found'));
				console.log('part two');

			// if the user is found but password is wrong
			if (!user.validPassword (password))
				return done(null, false, req.flash('loginMessage', 'oops, wrong password'));
				console.log('part three');

			// all is well, return successful user
			return done(null, user);
		});
	}));
};