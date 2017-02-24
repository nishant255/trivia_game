console.log("Loading myModel.js");
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2},
  score: { type: Number},
  percentage: { type: Number},
  answer_length: { type: Number},
}, {timestamps: true});

mongoose.model('User', UserSchema);
