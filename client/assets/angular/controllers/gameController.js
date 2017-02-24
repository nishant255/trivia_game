console.log("Loading Clientside gameController.js");

app.controller('gameController', ['$scope', '$location', 'questionFactory', 'userFactory', function ($scope, $location, questionFactory, userFactory){

  var _this = this;
  _this.questions = [];
  _this.error_messages = [];
  _this.randomQuestions = [];

  // -------------------------------------------------------------------------
  //                            Get all the Questions
  // -------------------------------------------------------------------------
  var getQuestions = function () {
    questionFactory.getQuestions(function (questionsAfterServer) {
      console.log(questionsAfterServer);
      if (questionsAfterServer.length < 1) {
        console.log("No");
        _this.noQuestion = true;
      } else {
        console.log("yes");
        _this.Questions = true;
      }
      _this.questionsLength = questionsAfterServer.length;
      _this.questions = questionsAfterServer;
    });
  };
  getQuestions();

  // -------------------------------------------------------------------------
  //                            Get Random  Questions
  // -------------------------------------------------------------------------
  var getRandomQuestions = function () {
    questionFactory.getRandomQuestions(function (questionsLength,questionsAfterServer) {
      _this.randomQuestions = questionsAfterServer;
    });
  };
  getRandomQuestions(_this.questionsLength);

  // -------------------------------------------------------------------------
  //                            Submit Game
  // -------------------------------------------------------------------------

  _this.submitGame = function () {
    console.log("User Submitted Game");
    console.log(_this.newGame);
    userFactory.submitGame(_this.newGame, function (message) {
      console.log("back in the Controller");
      console.log(message.data);
      _this.newGame = {};
      $location.url('/');
    });
  };

  // -------------------------------------------------------------------------
  //                            Checking if user Exist
  // -------------------------------------------------------------------------
  var checkUser = function () {
    console.log("Checking User if logged if");
    userFactory.checkUser(function (returnedData) {
      console.log(returnedData);
      if (returnedData === false) {
        $location.url('/');
      } else {
        _this.user = returnedData;
      }
    });
  };

  checkUser();
}]);


// -------------------------------------------------------------------------
//                            Filter for Title Case
// -------------------------------------------------------------------------

app.filter('titleCase', function() {
  return function(input) {
    input = input || '';
    return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };
});
