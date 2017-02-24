console.log("Loading Clientside dashboardController.js");

app.controller('dashboardController', ['$scope', '$location', 'userFactory', 'questionFactory',  function ($scope, $location, userFactory, questionFactory) {

  var _this = this;
  _this.users = [];
  _this.error_messages = [];

  // -------------------------------------------------------------------------
  //                            Login
  // -------------------------------------------------------------------------
  var login = function () {
    var name = prompt('Please Enter your Name to Play');
    name = name.toLowerCase();
    console.log(name);
    user = {name: name};
    userFactory.createUser(user, function (userAfterServer) {
      all_users();
      getQuestionLength();
      $location.url('/');
    });
  };

  // -------------------------------------------------------------------------
  //                       Length of all the questions
  // -------------------------------------------------------------------------
  var getQuestionLength = function () {
    questionFactory.getQuestions(function (questionsAfterServer) {
      console.log(questionsAfterServer.length);
      _this.questions_length = questionsAfterServer.length;
    });
  };

  // -------------------------------------------------------------------------
  //                            Get all the User
  // -------------------------------------------------------------------------
  var all_users = function () {
    userFactory.all_users(function (usersFromServer) {
      _this.users = usersFromServer;
      console.log("recieved all the users");
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
        login();
      } else {
        _this.user = returnedData;
        all_users();
        getQuestionLength();
      }
    });
  };

  checkUser();

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

// -------------------------------------------------------------------------
//                            Filter for Title Case
// -------------------------------------------------------------------------

app.filter('titleCase', function() {
  return function(input) {
    input = input || '';
    return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };
});
