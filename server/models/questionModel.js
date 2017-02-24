console.log("Loading QuestionModel");
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true, minlength: 15},
  answer: { type: String, required: true},
  fake1: { type: String, required: true},
  fake2: { type: String, required: true},
}, {timestamps: true});

mongoose.model('Question', QuestionSchema);
