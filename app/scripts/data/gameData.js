/**
 * Created by Benjamin on 07/06/2015.
 */

var ALL_GAME = {
  cards: [
    {
      idCard: 1,
      level: 1,
      value: 1,
      color: 'green',
      cost: {
        red: 1,
        blue: 2,
        black: 3
      }
    },
    {
      idCard: 2,
      level: 1,
      value: 0,
      color: 'blue',
      cost: {
        green: 1,
        blue: 2,
        white: 3
      }
    },
    {
      idCard: 3,
      level: 1,
      value: 1,
      color: 'red',
      cost: {
        green: 1,
        blue: 2,
        black: 3
      }
    },
    {
      idCard: 4,
      level: 1,
      value: 1,
      color: 'white',
      cost: {
        green: 1,
        blue: 7,
        black: 3
      }
    },
    {
      idCard: 5,
      level: 2,
      value: 2,
      color: 'white',
      cost: {
        red: 1,
        white: 2,
        black: 3
      }
    },
    {
      idCard: 6,
      level: 2,
      value: 4,
      color: 'white',
      cost: {
        green: 3,
        blue: 2,
        black: 2
      }
    },
    {
      idCard: 7,
      level: 2,
      value: 3,
      color: 'black',
      cost: {
        green: 1,
        white: 6,
        black: 3
      }
    },
    {
      idCard: 8,
      level: 2,
      value: 0,
      color: 'white',
      cost: {
        green: 4,
        blue: 1,
        black: 5
      }
    }
  ],
  tokens: {
    green: {
      nb: 7
    },
    white: {
      nb: 7
    },
    blue: {
      nb: 7
    },
    black: {
      nb: 7
    },
    red: {
      nb: 7
    }
    ,
    yellow: {
      nb: 7
    }
  }
};

