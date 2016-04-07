var express = require('express');
var expressSession = require('express-session');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var db = require('./config/db');

var mongoose = require('mongoose');
	
require('./app/models/Users');
var User = mongoose.model('User');
require('./app/models/Events');
var Event = mongoose.model('Event');
mongoose.connect('mongodb://localhost:27017/users');

var port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(methodOverride('X-HTTP-Method-Override')); 
app.use(express.static(__dirname + '/public')); 

require('./app/routes')(app);
app.listen(port);
console.log('Magic happens on port ' + port);
exports = module.exports = app;

function requireUser(req, res, next){
  if (!req.user) {
    res.redirect('/not_allowed');
  } else {
    next();
  }
}

function checkIfLoggedIn(req, res, next){
  if (req.session.username) {
    User.findOne({username: req.session.username}, function(err, user){
      if (user) {
        req.user = user;
        res.locals.user = user;
      }
      
      next();
    });
  } else {
    next();
  }
}
app.set('views', __dirname + '/public/views');
app.use( require('body-parser')() );

app.use( require('cookie-parser')() );

app.use( expressSession({
  secret: 'somesecretrandomstring'
}));

app.use(checkIfLoggedIn);

var exphbs = require('express-handlebars');
app.engine('html', exphbs({defaultLayout:'main'}));
app.set('view engine', 'html');

app.get('/', function(req, res){
  User.find({}).toArray(function(err, users){
    res.render('index', {users:users});  
  })
});

app.get('/login', function(req, res){
  res.render('login');
});

app.get('/logout', function(req, res){
  delete req.session.username;
  res.redirect('/');
});

app.get('/not_allowed', function(req, res){
  res.render('not_allowed');
});

app.get('/lol', function(req,res){
  User.find({}).exec(function(err,users){
  		if(err)
  			return console.log(err);
    	res.render('home', {users:users});
   });
});

function createUser(name, username, password, passwordConfirmation, birthday, callback){
	if(password != passwordConfirmation){
		var err = 'Passwords do not match';
		callback(err);
	}
	else {
		var query = {username: username};

		User.findOne(query, function(err,user){
			if(user) {
				err = 'The username you entered is already in use.';
				callback(err);
			}
			else {
				var userData = {
					name: name,
					username: username,
					password: password,
					birthday: birthday
				};
				var newU = new User(userData);
				newU.save(function(err,user){
					callback(err,user);
				});
			}
		});
	}
}
app.post('/signup', function(req,res){
	var name = req.body.name;
	var username = req.body.username;
	var password = req.body.password;
	var passwordConf = req.body.passwordConfirmation;
	var birthday = req.body.birthday;

	createUser(name,username,password,passwordConf,birthday, function(err,user){
		if(err){
			res.render('error', {error:err});
		}
		else {
			req.session.username = user.username;
			res.redirect('/');
		}
	});
});

function authenticateUser(username, password, callback){
  User.findOne({username: username, password:password}, function(err, user){
    callback(err, user);
  });
}

app.post('/login', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  
  authenticateUser(username, password, function(err, user){
    if (user) {
      // This way subsequent requests will know the user is logged in.
      req.session.username = user.username;
      res.redirect('/');
    } else {
      res.render('login', {badCredentials: true});
    }
  });
});


function createEvent(username,location, eventType, eventDescription,guests,maxGuests,callback){
	var eventData = {
		hostName: username,
		location:location,
		eventType: eventType,
		eventDescription: eventDescription,
		guests: guests,
		maxGuests: maxGuests
	};

	var newE = new Event(eventData);
	newE.save(function(err,event){
		callback(err,event);
	});
}

app.post('/event/create', function(req,res){
	if(req.user){
		var username = req.user.username;
		var location = req.body.location;
		var eventType = req.body.eventType;
		var eventDescription = req.body.eventDescription;
		var guests = req.body.guests;
		var maxGuests = req.body.maxGuests;

		createEvent(username,location, eventType, eventDescription,guests,maxGuests,function(err,event){
			if(err){
				res.render('error'. {error:err});
			}
			else{
				res.redirect('/event/view?id='+event._id); //this line is possibly wrong
			}
		});
	}
});

app.get('/event/create', function(req, res){
  res.render('event/create');
});