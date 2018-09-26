var express = require('express');
var app = express();

// app.js
var exphbs  = require('express-handlebars');
// REQUIRE HTTP MODULE
var http = require('http');
// INITIALIZE THE GIPHY-API LIBRARY
var giphy = require('giphy-api')();


// Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));


app.get('/', function (req, res) {
	console.log('inside the root route');
	giphy.search(req.query.term, function (err, response) {
		if (err != null) {
			console.log("CRASHED: ", err);
			giphy.trending(function (err, response) {
				res.render('home', {gifs: response.data});
			});
		} else {
			res.render('home', {gifs: response.data});
		}
	});
});

app.get('/hello-gif', function (req, res) {
	var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif';
	res.render('hello-gif', {gifUrl: gifUrl});
});

// pass in the name as a parameter
app.get('/greetings/:name', function (req, res) {
	var name = req.params.name;
	res.render('greetings', {name: name});
});




app.listen(3020, function () {
	console.log('Gif Search listening on port localhost:3020!');
});
