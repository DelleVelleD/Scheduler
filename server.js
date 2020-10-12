var express = require('express');
var exphbs = require('express-handlebars');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var course = require('./routes/api/course')

var app = express();
var port = process.env.PORT || 5000;
var db = require('./config/keys').mongoURI;

 //connection
 mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//connection message
mongoose.connection.once('open', function(){
	console.log('Successfully connected to database.');

}).on('error', function(error){
	console.log('[Database Connection Error]:' , error);
});

require('./models/Course');
var CourseModel = mongoose.model('Course');

CourseModel.find({}).all;
CourseModel.find(function (err, result) {
  console.log('Hola',result);
}).all;

/*
Express server( name of my app=sd1AngularSillyDemo in dist folder )

*/
app.use(express.static(__dirname + '/dist/sd1AngularSillyDemo'));

app.get('/*', (req, res) =>
res.sendFile(path.join(__dirname)));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var server= http.createServer(app);

server.listen(port, () =>  console.log('Running'));

