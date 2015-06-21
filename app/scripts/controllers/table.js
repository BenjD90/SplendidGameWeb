'use strict';

/**
 * @ngdoc function
 * @name splendidGameWebApp.controller:TableCtrl
 * @description
 * # TableCtrl
 * Controller of the splendidGameWebApp
 */
angular.module('splendidGameWebApp')
  .controller('TableCtrl', function ($scope, $routeParams, user, Auth, Ref, $firebaseObject, $location, $window, CST_MESSAGES, CST_PICKED_TOKEN_INITIAL) {

    initRound();

    $scope.userIndex = -1;

    function initRound() {
      $scope.table = $firebaseObject(Ref.child('tables/' + $routeParams.idTable));
      $scope.table.$loaded().then(function () {
        if (!$scope.table.players) {
          $scope.table.players = [];
        }
        //if I'm new and the table is full
        if (getIndexOfUser($scope.table.players, user.uid) == -1 && $scope.table.players.length >= $scope.nbPlayerMax) {
          alert('Table pleine !');
          return;
        }

        //if I'm new
        if (getIndexOfUser($scope.table.players, user.uid) == -1) {
          $scope.table.players.push({userId: user.uid});
        }

        //save the user index
        $scope.userIndex = getIndexOfUser($scope.table.players, user.uid);

        if (!$scope.table.game) {
          $scope.table.game = {
            token: ALL_GAME.tokens,
            cards: ALL_GAME.cards
          };
        }
        $scope.table.$save();
      });

      $scope.pickedToken = angular.copy(CST_PICKED_TOKEN_INITIAL);

      $scope.getArrayOfSize = function (num) {
        return new Array(num);
      }
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
      console.log($scope.pickedToken);
      console.log(tokenName);
      console.log(controlTokenPicked($scope.pickedToken, tokenName));
      console.log('------------------');
      if (controlTokenPicked($scope.pickedToken, tokenName) && $scope.table.game.token[tokenName].nb > 0) {
        $scope.pickedToken[tokenName].nb++;
        $scope.table.game.token[tokenName].nb--;

      }
    };

    $scope.nextPlayer = function () {
      $scope.table.players[$scope.userIndex].token = addTokens(angular.copy($scope.pickedToken), $scope.table.players[$scope.userIndex].token);
      $scope.table.$save();
      $scope.pickedToken = angular.copy(CST_PICKED_TOKEN_INITIAL);
    };

    $scope.cancelAction = function () {
      initRound();
    };

    $scope.quitTable = function () {
      $scope.table.players.splice($scope.table.players.indexOf(user.uid), 1);
      $scope.table.$save();
      //TODO change main player
    };

    $scope.takeCard = function (card) {
      if ($scope.userIndex != -1) {
        if (!$scope.table.players[$scope.userIndex].cards) {
          $scope.table.players[$scope.userIndex].cards = [];
        }
        if ($scope.table.players[$scope.userIndex].cards.indexOf(card) == -1) {
          //We take the card
          $scope.table.players[$scope.userIndex].cards.push(card);
          //Take a yellow token too
          $scope.getOneToken('yellow');
        }
      }
    };

    function addTokens(pickedTokens, userTokens) {
      var ret = {};
      angular.forEach(pickedTokens, function (value, key) {
        ret[key] = {};
        if (userTokens != undefined && userTokens[key] != undefined) {
          ret[key].nb = value.nb + userTokens[key].nb;
        } else {
          ret[key].nb = value.nb;
        }
      }, ret);
      debugger;
      return ret;
    }


    function getIndexOfUser(users, userId) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].userId == userId) {
          return i;
        }
      }
      return -1;
    }

    /**
     * Check if the user can take a token or not
     * Spec :
     * Take 3 gem tokens of different colors.
     * Take 2 gem tokens of the same color.
     * This action is only possible if there are at least 4 tokens of the chosen color left when the player takes them
     * @param pickedToken
     * @param tokenWanted
     * @return boolean true if one can else false
     */
    function controlTokenPicked(pickedToken, tokenWanted) {
      var properties = {
        sumAllPickedToken: 0,
        numberOfDifferentsColors: 0,
        maxPickedByColor: 0,
        maxPickedByColorColor: undefined,
        nbYellow: 0
      };
      angular.forEach(pickedToken, function (value, key) {
        properties.sumAllPickedToken += value.nb;
        if (value.nb != 0) {
          properties.numberOfDifferentsColors++;
        }
        if (value.nb > properties.maxPickedByColor) {
          properties.maxPickedByColor = value.nb;
          properties.maxPickedByColorColor = key;
        }
        if (key == 'yellow' && value.nb > 0) {
          properties.nbYellow++;
        }
      }, properties);

      //take the first token
      if (properties.sumAllPickedToken == 0) {
        return true;
      }

      if (properties.nbYellow > 0) {
        return false;
      }

      //exclud yellow
      if (tokenWanted == 'yellow' && properties.sumAllPickedToken > 0) {
        return false;
      }

      //3 colors max and only one by color and one doesn't pick in the same color
      //Take 3 gem tokens of different colors.
      if (properties.numberOfDifferentsColors < 3 && properties.maxPickedByColor < 2 && properties.maxPickedByColorColor != tokenWanted) {
        return true;
      }

      //already picked one
      //Take 2 gem tokens of the same color.
      return (properties.sumAllPickedToken > 0 && properties.maxPickedByColor < 2 && properties.numberOfDifferentsColors < 2 && properties.maxPickedByColorColor == tokenWanted && $scope.table.game.token[tokenWanted].nb > 2);

      return false;
    }
  });

