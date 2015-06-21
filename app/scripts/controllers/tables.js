'use strict';

/**
 * @ngdoc function
 * @name splendidGameWebApp.controller:TablesCtrl
 * @description
 * # TablesCtrl
 * Controller of the splendidGameWebApp
 */
angular.module('splendidGameWebApp')
  .controller('TablesCtrl', function ($scope, user, Auth, Ref, $firebaseObject, $firebaseArray) {
    $scope.user = user;
    $scope.profile = $firebaseObject(Ref.child('users/' + user.uid));

    $scope.tables = $firebaseArray(Ref.child('tables'));
    $scope.nbPlayer = 2;

    // display any errors
    $scope.tables.$loaded() .catch(console.log);

    $scope.openTable = function (e) {
      console.log('openTable');

      if (!$scope.tableForm.$valid) {
        console.log('Invalid Form');
        return;
      }

      // push a message to the end of the array
      var table = {
        dateCreation: Firebase.ServerValue.TIMESTAMP,
        nbPlayerMax: $scope.nbPlayer,
        opener: $scope.profile
      };
      table.opener.userId = $scope.user.uid;

      $scope.tables.$add(table)
        // display any errors
        .catch(console.log);
    };
  });
