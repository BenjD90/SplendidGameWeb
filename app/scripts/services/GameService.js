/**
 * Created by Benjamin on 21/06/2015.
 */

angular.module('splendidGameWebApp').factory("gameService", function (CST_PICKED_TOKEN_INITIAL) {
  var ref = this;

  this.pickedToken;


  function getIndexOfUser(users, userId) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].userId == userId) {
        return i;
      }
    }
    return -1;
  }

  return {
    initGame: function (table) {
      ref.table = table;

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
    }
  }
});
