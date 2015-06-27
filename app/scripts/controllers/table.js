'use strict';

/**
 * @ngdoc function
 * @name splendidGameWebApp.controller:TableCtrl
 * @description
 * # TableCtrl
 * Controller of the splendidGameWebApp
 */
angular.module('splendidGameWebApp')
  .controller('TableCtrl', function ($scope, $routeParams, user, Auth, Ref, $firebaseObject, $location, $window, CST_MESSAGES, CST_PICKED_TOKEN_INITIAL, gameService) {

    initRound();

    $scope.userIndex = -1;

    function initRound() {
      $scope.table = $firebaseObject(Ref.child('tables/' + $routeParams.idTable));
      $scope.table.$loaded().then(function () {
        gameService.initGame($scope.table, user);
        $scope.table.$save();
      });
    }

    $scope.getArrayOfSize = function (num) {
      return new Array(num);
    }

    //$window.onbeforeunload = function(event) {
    //  return CST_MESSAGES.quitGame;
    //};

    $window.onunload = function () {
      $scope.quitTable();
    };

    $scope.$on('$destroy', function () {
      $window.onbeforeunload = undefined;
      $window.onunload = undefined;
    });

    $scope.$on('$locationChangeStart', function (event) {
      var answer = confirm(CST_MESSAGES.quitGame);
      if (!answer) {
        event.preventDefault();
      } else {
        $scope.quitTable();
      }
    });

    //take one token
    $scope.getOneToken = function (tokenName) {
      gameService.getOneToken(tokenName);
    };

    $scope.nextPlayer = function () {
      gameService.nextPlayer();
    };

    $scope.cancelAction = function () {
      gameService.cancelAction();
    };

    $scope.quitTable = function () {
      gameService.quitTable();
    };

    $scope.takeCard = function (card) {
      gameService.takeCard(card);
    };


  });

