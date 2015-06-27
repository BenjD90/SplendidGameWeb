/**
 * Created by Benjamin on 21/06/2015.
 */

angular.module('splendidGameWebApp').factory("gameService", function (CST_PICKED_TOKEN_INITIAL) {
  var ref = this;

  this.pickedToken;
  this.table;
  this.userIndex;
  this.user;

  function getIndexOfUser(users, userId) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].userId == userId) {
        return i;
      }
    }
    return -1;
  }

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


  return {
    initGame: function (table, user) {
      ref.table = table;
      ref.user = user;

      if (!ref.table.players) {
        ref.table.players = [];
      }
      //if I'm new and the table is full
      if (getIndexOfUser(ref.table.players, user.uid) == -1 && ref.table.players.length >= ref.table.nbPlayerMax) {
        alert('Table pleine !');
        return;
      }

      //if I'm new
      if (getIndexOfUser(ref.table.players, user.uid) == -1) {
        ref.table.players.push({userId: user.uid});
      }

      //save the user index
      ref.userIndex = getIndexOfUser(ref.table.players, user.uid);

      if (!ref.table.game) {
        ref.table.game = {
          token: ALL_GAME.tokens,
          cards: ALL_GAME.cards
        };
      }


      ref.pickedToken = angular.copy(CST_PICKED_TOKEN_INITIAL);

      return;
    },
    getOneToken: function (tokenName) {
      console.log(ref.pickedToken);
      console.log(tokenName);
      console.log(controlTokenPicked(ref.pickedToken, tokenName));
      console.log('------------------');
      if (controlTokenPicked(ref.pickedToken, tokenName) && ref.table.game.token[tokenName].nb > 0) {
        ref.pickedToken[tokenName].nb++;
        ref.table.game.token[tokenName].nb--;

      }
    },

    nextPlayer: function () {
      ref.table.players[ref.userIndex].token = addTokens(angular.copy(ref.pickedToken), ref.table.players[ref.userIndex].token);
      ref.table.$save();
      ref.pickedToken = angular.copy(CST_PICKED_TOKEN_INITIAL);
    },

    cancelAction: function () {
      this.initGame();
    },
    quitTable: function () {
      ref.table.players.splice(ref.table.players.indexOf(ref.user.uid), 1);
      ref.table.$save();
      //TODO change main player
    },
    takeCard: function (card) {
      if (ref.userIndex != -1) {
        if (!ref.table.players[ref.userIndex].cards) {
          ref.table.players[ref.userIndex].cards = [];
        }
        if (ref.table.players[ref.userIndex].cards.indexOf(card) == -1) {
          //We take the card
          ref.table.players[ref.userIndex].cards.push(card);
          //Take a yellow token too
          ref.getOneToken('yellow');
        }
      }
    }
  };
})
;
