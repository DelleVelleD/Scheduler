var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');


var mongo = require('mongoose');

var db = mongo.connet("mongodb+srv://dbSebastian:Qq7725230@schedulercluster-mz78t.mongodb.net/test?retryWrites=true&w=majority",
 function (err, response) {
    if (err) { console.log(err); }
    else { console.log('Connected to ' + db, ' + ', response); }
});

var app = express();

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();

});

app.listen(4200, function (){
  console.log('Example app listening on port 4200')
})

var Schema = mongo.Schema;

var UsersSchema = new Schema({
    CRN: { type: Number },
    CRSENO: { type: String },
    TITLE: { type: String},
    SECTNO: { type: Number},
    DAYS: { type: String},
    START: {type: Number},
    END: { type: Number},
    ROOM: { type: String},
    PER: { type: Number},
    CRDTS: { type: Number},
    LASTNAME: { type: String},
    FIRSTNAME: {type: String}

 }, { versionKey: false });

var model = mongo.model('spring2019', UsersSchema, "users");


app.get("/api/getUser", function (req, res) {
    model.find({}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
         }

    });

})



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

  // app.post("/api/deleteUser",function(req, res){
  //     model.remove({ _id: req.body.id }, function (err) {
  //         if (err) {
  //             res.send(err);
  //         }
  //         else {
  //             res.send({ data: "Record has been deteled..!!" });

  //         }
  //     });

  // })


