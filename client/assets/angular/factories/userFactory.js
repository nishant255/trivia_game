console.log("Loading userFactory.js");

app.factory('userFactory', ['$http', function ($http) {

  var user = {};

  function UserFactory() {

    var _this = this;    

    // -------------------------------------------------------------------------
    //                            Create User
    // -------------------------------------------------------------------------

    _this.createUser = function (newUser, callback) {
      console.log(newUser);
      $http.post('/user', newUser).then(function (dataFromServer) {
        console.log("User from Server");
        console.log(dataFromServer);
        user = dataFromServer.data;
        if (typeof(callback) == 'function') {
          callback(user);
        }
      });
    };

    // -------------------------------------------------------------------------
    //                            Get All the Users
    // -------------------------------------------------------------------------
    _this.all_users = function (callback) {
      console.log("Required all the users");
      $http.get('/users').then(function (usersFromServer) {
        if (typeof(callback) == 'function') {
          console.log("in the Factory");
          callback(usersFromServer.data);
        }
      });
    };

    // -------------------------------------------------------------------------
    //                      Check Logged in User
    // -------------------------------------------------------------------------

    _this.checkUser = function (callback) {
      console.log("Checking for user in factory");
      console.log(user);
      if (!user.name) {
        callback(false);
      } else {
        callback(user);
      }
    };

    // -------------------------------------------------------------------------
    //                      Logout
    // -------------------------------------------------------------------------

    _this.logout = function (callback) {
      user = {};
      if (typeof(callback) == 'function') {
        callback("Successfully Logged Out");
      }
    };

    // -------------------------------------------------------------------------
    //                      Submitted Game
    // -------------------------------------------------------------------------

    _this.submitGame = function (newGame, callback) {
      // newGame.userid = user._id;
      console.log("Submiting Game from factory");
      $http.put('/user/'+user._id, newGame)
      .then(function (dataFromServer) {
        console.log(dataFromServer);
        if (typeof(callback) == 'function') {
          callback(dataFromServer);
        }
      });
    };

  }
  return new UserFactory();
}]);
