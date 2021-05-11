class Player {
    constructor(name) {
        this.name = name;
        this.points = 0; // points won in current game
        this.games = 0; // games won
    }

    winPoint() {
        this.points += 1;
    }

    winGame() {
        this.games += 1;
        this.points = 0;
    }

    loseGame() {
        this.points = 0;
    }
}

module.exports = {
    Player
}