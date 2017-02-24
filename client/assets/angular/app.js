console.log("Loading Master App JS");

var app = angular.module('app', ['ngRoute', 'ngMessages']);

app.config( function ($routeProvider) {

  $routeProvider

    .when('/', {
      templateUrl: 'partials/dashboard.html',
      controller: 'dashboardController',
      controllerAs: 'DC'
    })

    .when('/lets_play', {
      templateUrl: 'partials/game.html',
      controller: 'gameController',
      controllerAs: 'GC'
    })

    .when('/new_question', {
      templateUrl: 'partials/new_question.html',
      controller: 'newQuestionController',
      controllerAs: 'QC'
    })

    .otherwise({
      redirectTo: '/'
    });

});
