
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
	var user = {
		first_name: 'Dong',
		surname: 'Xi',
		address: 'Jefferson',
		facebook_friends: '10'
	}
	res.render('index.jade', {title: 'User', user:user });
});
app.post('/', function(req, res) {
	res.send(req.body);
});
app.get('/about', function(req, res) {
	res.send("Hello from the about route.");
});
app.get('/users', user.list);
app.get('/users/:id', function(req, res) {
	res.send("Show the content for user " + req.params.id);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
