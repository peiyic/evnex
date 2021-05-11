const match = require('../match');

test('initialize match', () => {
    const match1 = new match.Match('player1', 'player2');
    console.log = jest.fn();

    match1.score();

    expect(match1.winner).toBeNull();
    expect(match1.tieBreak).toBeFalsy();
    expect(console.log).toHaveBeenCalledWith('0-0, 0-0');
})

test('player wins a point', () => {
    const match1 = new match.Match('player1', 'player2');
    console.log = jest.fn();

    match1.pointWonBy('player1');
    match1.score();

    expect(console.log).toHaveBeenCalledWith('0-0, 15-0');
})

test('player wins a game', () => {
    const match1 = new match.Match('player1', 'player2');
    console.log = jest.fn();

    for (let i=0; i< 4; i++) {
        match1.pointWonBy('player1');
    }
    match1.score();

    expect(console.log).toHaveBeenCalledWith('1-0, 0-0');
})

test('player wins the match', () => {
    const match1 = new match.Match('player1', 'player2');
    console.log = jest.fn();

    for (let i=0; i< 24; i++) {
        match1.pointWonBy('player1');
    }
    match1.score();

    expect(console.log).toHaveBeenCalledWith('player1 has won the match');
    expect(console.log).toHaveBeenCalledWith('6-0, 0-0');
})

test('convert points into score', () => {
    const match1 = new match.Match('player1', 'player2');
    console.log = jest.fn();

    match1.score();
    expect(console.log).toHaveBeenCalledWith('0-0, 0-0');

    match1.pointWonBy('player1');
    match1.score();
    expect(console.log).toHaveBeenCalledWith('0-0, 15-0');

    match1.pointWonBy('player1');
    match1.score();
    expect(console.log).toHaveBeenCalledWith('0-0, 30-0');

    match1.pointWonBy('player1');
    match1.score();
    expect(console.log).toHaveBeenCalledWith('0-0, 40-0');
})

test('deuce score', () => {
    const match1 = new match.Match('player1', 'player2');
    console.log = jest.fn();

    for (let i = 0; i < 3; i++) {
        match1.pointWonBy('player1');
        match1.pointWonBy('player2');
    }
    match1.score();

    expect(console.log).toHaveBeenCalledWith('0-0, Deuce');
})

test('advantage score', () => {
    const match1 = new match.Match('player1', 'player2');
    console.log = jest.fn();

    for (let i = 0; i < 3; i++) {
        match1.pointWonBy('player1');
        match1.pointWonBy('player2');
    }
    match1.pointWonBy('player1');
    match1.score();

    expect(console.log).toHaveBeenCalledWith('0-0, Advantage player1');
})

test('tie break game', () => {
    const match1 = new match.Match('player1', 'player2');
    console.log = jest.fn();

    // each player wins 5 games first
    for (let i = 0; i < 20; i++) {
        match1.pointWonBy('player1');
    }
    for (let i = 0; i < 20; i++) {
        match1.pointWonBy('player2');
    }
    // afterwards each player wins one game
    for (let i = 0; i < 4; i++) {
        match1.pointWonBy('player1');
    }
    for (let i = 0; i < 4; i++) {
        match1.pointWonBy('player2');
    }

    // during tie break game
    for(let i = 0; i < 6; i++) {
        match1.pointWonBy('player1');
        match1.score();
        expect(console.log).toHaveBeenCalledWith(`6-6, ${i+1}-0`);
    }

    // player1 wins tie break game thus wins the match
    match1.pointWonBy('player1');
    match1.score();
    expect(console.log).toHaveBeenCalledWith('7-6, 0-0');
    expect(console.log).toHaveBeenCalledWith('player1 has won the match');
})