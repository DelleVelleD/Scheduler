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
mongoose.connection.once('open', function()
{
	console.log('Successfully connected to database.');
//	db.collection('spring2019').find({}).toArray(function (err, result) 
//	{
//		console.log(result)
//	});
}).on('error', function(error)
{
	console.log('[Database Connection Error]:' , error);
});

require('./models/Course');
var CourseModel = mongoose.model('Course');

// var routes = require('./routes/api/course');
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

// app.use('/api', course)

 var server= http.createServer(app);

server.listen(port, () =>  console.log('Running'));

//  app.listen(4200, function (){
//   console.log('Example app listening on port '+ port);
// });


//  app.engine('handlebars', exphbs({
//      defaultLayout: 'main'
//  }));
//  app.set('view engine', 'handlebars');

// app.use(function(req, res, next){

// req.name = "Hola Juanchito";
// next();
// });

// app.get('/', (req, res) => {

//   res.render('src/main');
//     });

//     app.get('/about', (req, res)=>{
//     res.render('index');
//     });

// app.post("/api/SaveUser", function (req, res) {
  //     var mod = new model(req.body);
  //     if (req.body.mode == "Save") {
  //         mod.save(function (err, data) {
  //             if (err) {
  //                 res.send(err);
  //             }
  //             else {
  //                 res.send({ data: "Record has been inserted..!!" });
  //             }

  //         });
  //     }
  //     else {

  //         model.findByIdAndUpdate(req.body.id, { name: req.body.name, address: req.body.address },
  //             function (err, data) {
  //                 if (err) {
  //                     res.send(err);

  //                 }
  //                 else {
  //                     res.send({ data: "Record has been Update..!" });
  //                 }
  //             });
  //     }
  // })
