'use strict';

angular.module('splendidFirebaseApp')
  .filter('notFullTables', function() {
    return function(items) {
      return angular.isArray(items) ? items.filter(function (element) {
        var nbPlayer = 0;
        if (!angular.isUndefined(element.players)) {
          nbPlayer = element.players.length;
        }
        return element.nbPlayerMax - nbPlayer > 0;
      }) : [];
    }
  });
