var express = require('express');
var exphbs = require('express-handlebars');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//var course = require('./routes/api/course');

var app = express();
var db = require('./config/keys').mongoURI;

 //connection
 /*
 mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//connection message

mongoose.connection.once('open', function(){
	console.log('Successfully connected to database.');
	db.collection('spring2019').find({}).toArray(function (err, result) 
	{
		console.log(result)
	});
}).on('error', function(error)
{

	console.log('[Database Connection Error]:' , error);
});

require('./models/Course');
var CourseModel = mongoose.model('Course');

CourseModel.find({}).all;
CourseModel.find(function (err, result) {
  console.log('Error in finding course model',result);
}).all;
*/

/*
Express server( name of my app=sd1AngularSillyDemo in dist folder )

*/
app.use(express.static(__dirname + '/dist/sd1AngularSillyDemo'));

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname+'/dist/sd1AngularSillyDemo/index.html'));
});

app.listen(process.env.PORT || 8080, function(){ console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env)});
/*
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var server= http.createServer(app);

server.listen(port, () =>  console.log('Running'));

*/