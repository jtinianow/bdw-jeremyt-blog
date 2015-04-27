

var	express		= require('express'),
	app			= express(),
	config		= require('./config/config'),
	glob		= require('glob'),
	mongoose	= require('mongoose'),
	passport	= require('passport'),
	flash		= require('connect-flash'),
	session		= require('express-session');

var userDB		= require('./config/userdb.js');

mongoose.connect(config.db); //connect to db

var db = mongoose.connection;

db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});

// Passport
require('./config/passport')(passport);
app.use(session({secret: 'gin'})); //session secret
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
app.use(flash()); //use connect-flash for flash messages in stored session

// Configure the App
require('./config/express')(app, config);

// Launch the App
app.listen(process.env.PORT || 3000);

