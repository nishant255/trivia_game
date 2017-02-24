console.log("Loading Clientside newQuestionController.js");

app.controller('newQuestionController', ['$scope', '$location', 'questionFactory', 'userFactory', function ($scope, $location, questionFactory, userFactory) {

  var _this = this;
  _this.error_messages = [];

  // -------------------------------------------------------------------------
  //                            Create Question
  // -------------------------------------------------------------------------
  _this.createQuestion = function () {
    console.log("User Submitted a Question", _this.newQuestion);
    questionFactory.createQuestion(_this.newQuestion, function (questionAfterServer) {
      console.log(questionAfterServer);
      _this.newTopic = {};
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

  // -------------------------------------------------------------------------
  //                       Length of all the questions
  // -------------------------------------------------------------------------
  var getQuestionLength = function () {
    questionFactory.getQuestions(function (questionsAfterServer) {
      console.log(questionsAfterServer.length);
      _this.questions_length = questionsAfterServer.length;
    });
  };
  getQuestionLength();

  // -------------------------------------------------------------------------
  //                           Logout
  // -------------------------------------------------------------------------


  _this.logout = function () {
    userFactory.logout(function (message) {
      console.log(message);
      login();
    });

  };

}]);
