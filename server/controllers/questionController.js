console.log("Loading Serverside questionController.js");

var mongoose = require('mongoose'),
    Question = mongoose.model('Question');

// Question.create({question: "Who was the legendary Benedictine monk who invented champagne?", answer: "Dom Perignon", fake1: "Nishant Patel", fake2: "Donald Trump"});
// Question.create({question: "Name the largest freshwater lake in the world?", answer: "Lake Superior", fake1: "Lake Elizabeth", fake2: "Lake Marriot"});
// Question.create({question: "What kind of weapon is a falchion?", answer: "A Sword", fake1: "A Knife", fake2: "A Gun"});
// Question.create({question: "What is another word for lexicon?", answer: "Dictionary", fake1: "Book", fake2: "Laptop"});
// Question.create({question: "Name the seventh planet from the sun.", answer: "Uranus", fake1: "Pluto", fake2: "Earth"});

function QuestionController() {

  var _this = this;
  _this.error = [];

  // -------------------------------------------------------------------------
  //                           Create Questions
  // -------------------------------------------------------------------------
  _this.createQuestion = function (req, res) {
    console.log(req.body);
    if (!req.body.question) {_this.error.push('Question is Required');}
    if (!req.body.answer) {_this.error.push('Answer is Required');}
    if (!req.body.fake1) {_this.error.push('Fake Answer 1 is Required');}
    if (!req.body.fake2) {_this.error.push('Fake Answer 2 is Required');}
    if (_this.error.length > 0) {res.json(_this.error);}
    Question.create(req.body, function (err, question) {
      if (err) {
        console.log("Error while creating Question");
        console.log(err);
        res.json(err);
      } else {
        console.log("Successfully Created Question");
        res.json(question);
      }
    });
  };


  // -------------------------------------------------------------------------
  //                           Get all the questions
  // -------------------------------------------------------------------------
  _this.getQuestions = function (req, res) {
    Question.find({}, function (err, questions) {
      if (err) {
        console.log("Erroro getting all the questions");
        console.log(err);
      } else {
        console.log("Sending all the Questions");
        if (questions.length < 5) {
          Question.create({question: "Who was the legendary Benedictine monk who invented champagne?", answer: "Dom Perignon", fake1: "Nishant Patel", fake2: "Donald Trump"});
          Question.create({question: "Name the largest freshwater lake in the world?", answer: "Lake Superior", fake1: "Lake Elizabeth", fake2: "Lake Marriot"});
          Question.create({question: "What kind of weapon is a falchion?", answer: "A Sword", fake1: "A Knife", fake2: "A Gun"});
          Question.create({question: "What is another word for lexicon?", answer: "Dictionary", fake1: "Book", fake2: "Laptop"});
          Question.create({question: "Name the seventh planet from the sun.", answer: "Uranus", fake1: "Pluto", fake2: "Earth"});
        }
        res.json(questions);
      }
    });
  };

  // -------------------------------------------------------------------------
  //                           Get all the questions
  // -------------------------------------------------------------------------
  _this.getRandomQuestions = function (req, res) {
    // Question.find({}, function (err, questions) {
    //   if (err) {
    //     console.log("Erroro getting all the questions");
    //     console.log(err);
    //   } else {
    //     console.log("Sending 3 the Questions");
    //     res.json(questions);
    //   }
    // });
    // Question.aggregate([$sample: { size: 3 }]);
  };

}

module.exports = new QuestionController();
