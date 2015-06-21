'use strict';

/**
 * @ngdoc function
 * @name splendidGameWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the splendidGameWebApp
 */
angular.module('splendidGameWebApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
