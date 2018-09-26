const express = require('express');
const app = express();

const exphbs  = require('express-handlebars');
const http = require('http');
const giphy = require('giphy-api')();


// Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));


app.get('/', function (req, res) {
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
	let gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif';
	res.render('hello-gif', {gifUrl: gifUrl});
});

// pass in the name as a parameter
app.get('/greetings/:name', function (req, res) {
	let name = req.params.name;
	res.render('greetings', {name: name});
});


const port = process.env.PORT || 3020;

app.listen(port, () => {
	console.log(`Gify istening on port: ${port}`);
});
