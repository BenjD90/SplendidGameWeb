'use strict';

/**
 * @ngdoc function
 * @name splendidFirebaseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the splendidFirebaseApp
 */
angular.module('splendidFirebaseApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
