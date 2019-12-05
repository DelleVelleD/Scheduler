var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CourseSchema = new Schema({
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

  });

  mongoose.model('Course', CourseSchema);
