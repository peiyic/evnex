const match = require('./match');

match1 = new match.Match('player1', 'player2');

match1.pointWonBy('player1');
match1.pointWonBy('player2');
match1.score();

match1.pointWonBy('player1');
match1.pointWonBy('player1');
match1.score();

match1.pointWonBy('player2');
match1.pointWonBy('player2');
match1.score();

match1.pointWonBy('player1');
match1.score();

match1.pointWonBy('player1');
match1.score();