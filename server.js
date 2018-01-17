var http = require('http');

var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var engines = require('consolidate');
var url = 'mongodb://localhost:27017/video';

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({
  extended: true
}));


MongoClient.connect(url, function(err, client) {
	const db = client.db('video')
	
	app.get('/', function(req, res) {
		db.collection('movies').find({}).toArray(function(err, docs){
			console.log(docs)
			res.render('moviesList', { 'movies': docs } );
		})
	})

	app.post('/favorite_movie', function(req, res, next) {
		var favorite = req.body.filmName;
		res.send('Favorite is ' + favorite);
	})

	app.use(function(req, res) {
		res.sendStatus(404)
	})

	var server = app.listen(3000, function(){
		var port = server.address().port;
		console.log('server is running');
	})
})
