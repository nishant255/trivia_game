console.log("Loading Serverside UserController.js");

var mongoose = require('mongoose'),
    User = mongoose.model('User');

function UserController() {

  var _this = this;

  // -------------------------------------------------------------------------
  //                      Create or Return Existing User
  // -------------------------------------------------------------------------
  _this.createUser = function (req, res) {
    console.log("Creating User");
    console.log(req.body.name);
    if (!req.body.name) {
      res.json({error: ["Name is required"]});
    }
    User.findOne({name: req.body.name}, function (err, user) {
      if (err) {
        console.log("Error while Finding User");
        console.log(err);
      } else {
        if (!user) {
          console.log("User Not Found! Creating New User");
          console.log(req.body);
          req.body.score = 0;
          req.body.percentage = 0;
          User.create(req.body, function (err, user) {
            if (err) {
              console.log("Error while Creating User");
              console.log(err);
            } else {
              console.log("User Created");
              res.json(user);
            }
          });
        } else {
          console.log("User Found");
          res.json(user);
        }
      }
    });
  };

  // -------------------------------------------------------------------------
  //                      Submit Game From User
  // -------------------------------------------------------------------------


  _this.submitGame = function (req, res) {
    User.findOne({_id: req.params.id}, function (err, user) {
      if (err) {
        console.log("Error while find user on game submit");
        console.log(err);
      } else {
        if (!req.body.answer) {
          res.json({message: "Please Enter Question"});
        } else {
          var answer_length = Object.keys(req.body.answer).length;
          console.log(req.body.answer);
          var score = 0;
          for (var key in req.body.answer) {
            console.log(key + "->" + req.body.answer[key]);
            if (req.body.answer[key] === "true") {
              score = score+1;
              console.log("True Found");
            }
          }
          user.score = score;
          var percent = (score/answer_length) * 100;
          user.percentage = percent;
          user.answer_length = answer_length;
          user.save(function (err, updatedUser) {
            if (err) {
              console.log("Error while saving user after calculation Scores");
              console.log(err);
            } else {
              console.log("Scores Updated");
              res.json({message: "Scores Updated"});
            }
          });
        }
      }
    });
  };

  // -------------------------------------------------------------------------
  //                           Get all the users
  // -------------------------------------------------------------------------
  _this.all_users = function (req, res) {
    User.find({}, function (err, users) {
      if (err) {
        console.log("Error While finding all the users");
        console.log(err);
      } else {
        res.json(users);
      }

    });
  };

}

module.exports = new UserController();
