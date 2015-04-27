var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Article = mongoose.model('Article');
  passport = require('passport');

module.exports = function (app) {
  app.use('/', router);
};

// router.get('/', function (req, res, next) {
//   Article.find(function (err, articles) {
//     if (err) return next(err);
//     res.render('index', {
//       title: 'Generator-Express MVC',
//       articles: articles
//     });
//   });
// });

// Home Page (with login Links)
router.get('/', function (req, res) {
  res.render('index', {
    title: 'Jerms'
  });
});

// LOGIN
// show the login form
router.get('/login', function (req, res) {
  res.render('login', {
    message: req.flash('loginMessage')
  });
});

// process the login form
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));


// SIGNUP
// show the signup form
router.get('/signup', function (req, res) {
  res.render('signup', {
    message: req.flash('signupMessage')
  });
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true
}));

// DASHBOARD
// router.get('/dashboard', isLoggedIn, function (req, res) {
//   res.render('dashboard', {
//     user: req.user
//   });
// });

router.get('/dashboard', isLoggedIn, function (req, res) {

  Article.find().sort({'createdAt': -1}).exec( function(err, articles){

        res.render('dashboard', {
          title: 'Jerms',
          articles: articles // return all the articles to list.swig
        });

    });

});

// LOGOUT
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// make sure user is logged in
function isLoggedIn (req, res, next) {
  // if authenticated, continue session
  if (req.isAuthenticated())
    return next();

  // if not, redirect to home
  res.redirect('/');
}