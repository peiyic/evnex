const player = require('./player');

const POINTS_TO_SCORE = [0, 15, 30, 40];
const POINTS_WIN_GAME = 4;
const DEUCE_POINTS = 3;
const POINTS_WIN_TIE_BREAK = 7;
const POINTS_MARGIN = 2;
const GAMES_WIN_SET = 6;
const GAMES_MARGIN = 2;
const TIE_BREAK_GAME = 6;

class Match {
    players = [];
    
    constructor(player1, player2) {
        this.players.push(new player.Player(player1));
        this.players.push(new player.Player(player2));
        this.winner = null;
    }

    /* sorted players by points won in current game */
    get playersSortedByPoints() {
        return [...this.players].sort(function(a, b) {
            return a.points - b.points;
        });
    }

    /* sorted players by the number of games won */
    get playersSortedByGames() {
        return [...this.players].sort(function(a, b) {
            return a.games - b.games;
        });
    }

    /* whether it is in tie break game */
    get tieBreak() {                
        return this.players.every(p => p.games == TIE_BREAK_GAME);
    }

    /* a player wins a point*/
    pointWonBy(playerName) {
        if (this.winner) {
            console.log(`${this.winner.name} has won the match`);
            return;
        }
        const player = this.players.find(p => p.name == playerName);
        player.winPoint();
        this.checkWinning();
    }

    /* check if any game or set is won */
    checkWinning() {
        this.checkGame();
        this.checkSet();
    }

    /* check if set/match is won */
    checkSet() {
        if ((this.playersSortedByGames[1].games == TIE_BREAK_GAME + 1 && this.playersSortedByGames[0].games == TIE_BREAK_GAME) ||
            (this.playersSortedByGames[1].games >= GAMES_WIN_SET && 
                (this.playersSortedByGames[1].games - this.playersSortedByGames[0].games) >= GAMES_MARGIN)) {
            this.winner = this.playersSortedByGames[1];
            console.log(`${this.winner.name} has won the match`)
        }
    }

    /* check if the current game is won */
    checkGame() {
        if (this.tieBreak) {
            if (this.playersSortedByPoints[1].points >= POINTS_WIN_TIE_BREAK && 
                (this.playersSortedByPoints[1].points - this.playersSortedByPoints[0].points) >= POINTS_MARGIN) {
                this.playersSortedByPoints[0].loseGame();
                this.playersSortedByPoints[1].winGame();
            }

        } else if (this.playersSortedByPoints[1].points >= POINTS_WIN_GAME && 
            (this.playersSortedByPoints[1].points - this.playersSortedByPoints[0].points) >= POINTS_MARGIN ) {
            this.playersSortedByPoints[0].loseGame();
            this.playersSortedByPoints[1].winGame();
        }
    }

    /* print out score*/
    score() {
        const setScore = `${this.players[0].games}-${this.players[1].games}`;
        const gameScore = this.caculateGameScore();
        
        console.log(`${setScore}, ${gameScore}`);
    }

    /* caculate the current game's score*/
    caculateGameScore() {
        if (this.tieBreak) {
            return `${this.players[0].points}-${this.players[1].points}`;
        }

        if (this.players.every(p => p.points >= DEUCE_POINTS)) {
            if (this.players[0].points == this.players[1].points) {
                return 'Deuce';
            } else {
                return `Advantage ${this.playersSortedByPoints[1].name}`;
            }
        }
        return `${POINTS_TO_SCORE[this.players[0].points]}-${POINTS_TO_SCORE[this.players[1].points]}`;
    }
}

module.exports = {
    Match
}