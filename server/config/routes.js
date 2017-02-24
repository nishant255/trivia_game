console.log("Loading routes.js");
var path         = require('path'),
    questionController = require('./../controllers/questionController.js');
    userController = require('./../controllers/userController.js');

module.exports = function (app) {

  app.get('/users', userController.all_users);
  app.post('/user', userController.createUser);
  app.put('/user/:id', userController.submitGame);

  app.post('/question', questionController.createQuestion);
  app.get('/questions', questionController.getQuestions);
  app.get('/questions/:questionsLength', questionController.getRandomQuestions);
};
