console.log("Loading questionFactory.js");

app.factory('questionFactory', ['$http', function ($http) {

  // Initialize Required Attributes

  function QuestionFactory() {

    var _this = this;
    _this.message = [];

    // -------------------------------------------------------------------------
    //                            Create Question
    // -------------------------------------------------------------------------

    _this.createQuestion = function (newQuestion, callback) {
      console.log("Factory Says: Creating Question", newQuestion);
      $http.post('/question', newQuestion).then(function (questionAfterServer) {
        if (typeof(callback) == 'function') {
          callback(questionAfterServer);
        }
      });
    };

    // -------------------------------------------------------------------------
    //                            Get All the questions
    // -------------------------------------------------------------------------
    _this.getQuestions = function (callback) {
      $http.get('/questions').then(function (questionsAfterServer) {
        if (typeof(callback) == 'function') {
          callback(questionsAfterServer.data);
        }
      });
    };

    // -------------------------------------------------------------------------
    //                            Get All the questions
    // -------------------------------------------------------------------------
    _this.getRandomQuestions = function (questionsLength, callback) {
      $http.get('/questions' + questionsLength).then(function (questionsAfterServer) {
        if (typeof(callback) == 'function') {
          callback(questionsAfterServer.data);
        }
      });
    };


  }
  return new QuestionFactory();
}]);
