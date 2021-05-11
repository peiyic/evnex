const player = require('../player');

test('initialize player', () => {
    const player1 = new player.Player("player1");

    expect(player1.name).toBe('player1');
    expect(player1.points).toBe(0);
    expect(player1.games).toBe(0);
});

test('player wins a point', () => {
    const player1 = new player.Player("player1");

    player1.winPoint();

    expect(player1.points).toBe(1);
});

test('player wins a game', () => {
    const player1 = new player.Player("player1");

    player1.winPoint();
    player1.winGame();

    expect(player1.points).toBe(0);
    expect(player1.games).toBe(1);
});

test('player loses a game', () => {
    const player1 = new player.Player("player1");

    player1.winPoint();
    player1.loseGame();

    expect(player1.points).toBe(0);
    expect(player1.games).toBe(0);
});