// A list of valid player tokens ordered by their play order
const PLAYER_TOKENS = ['x', 'o'];
// The board size, locked at 9 to start
const BOARD_SIZE = 9;
const WIN_POSITIONS = [[0,1,2], [0,3,6], [0,4,8], [1,4,7], [3,4,5],[6,7,8],[2,5,8],[2,4,6]];

function TicTacToe() {
    // initialize the board with empty strings
    this.board = Array.from({ length: BOARD_SIZE }).map(() => '');
    this.moves = [];
    this.winner = '';
}

/**
 * Check to see if a propsed move is valid.
 * A move is valid if there is not a winner, it is the players turn and the position on the board is empty.
 * @param {string} player 
 * @param {int} position 
 */
TicTacToe.prototype.isValidMove = function(player, position) {
    return ((PLAYER_TOKENS.indexOf(player) !== -1) &&
            (this.winner === '') &&
            (this.turn() === player) &&
            (this.board[position] === ''));
}

/**
 * Accepts a move as player token and position on the board, tests its validity, updates the board state if valid and checks for win conditions
 * @param {string} player 
 * @param {int} position 
 */
TicTacToe.prototype.move = function(player, position) {
    // Normalize player token
    player = player.toLowerCase();
    if (this.isValidMove(player, position)) {
        this.moves.push({player, position});
        this.board[position] = player;
        this.evaluate();
        return true;
    }
    else {
        return false;
    }
}

/**
 * Returns the player token of the player who can play next
 */
TicTacToe.prototype.turn = function() {
    let player;

    if (this.moves.length === 0) {
        // If no moves have been made, it is the first valid players turn
        player = PLAYER_TOKENS[0];
    }
    else if (this.winner !== '') {
        // If there is already a winner, there is no next player turn
        player = '';
    }
    else if (this.moves.length === BOARD_SIZE) {
        // If there are no valid moves left, there is no next player turn
        player = '';
    }
    else {
        let previousPlayerTurnIndex = PLAYER_TOKENS.indexOf(this.moves[this.moves.length - 1].player);
        // Return either the next player in the valid players list or start over from the beginning
        player = (previousPlayerTurnIndex + 1 === PLAYER_TOKENS.length)
            ? PLAYER_TOKENS[0]
            : PLAYER_TOKENS[previousPlayerTurnIndex + 1];
    }
    
    return player;
}

/**
 * Evaluates the board for win conditions, sets the winner and returns true on the first win condition encountered otherwise returns false
 */
TicTacToe.prototype.evaluate = function() {
    let won = false;

    for (const win of WIN_POSITIONS) {
        // grab the first position to check against others within the win condition
        let player = this.board[win[0]];
        if (player !== '') {
            // collect all the tokens in the postions being evaluated for a win
            let tokens = win.map((position) => this.board[position]);
            // If all the tokens match the first token we found, we have a win condition
            if(tokens.every((token) => token === player)) {
                // set the winner to the player and won to true
                this.winner = player;
                won = true;
            }
        }
        else {
            // If the first position of the win condition is empty, move on to the next
            continue;    
        }
    }

    // return won flag, if we never set it to true the initial value is false;
    return won;
}

module.exports = TicTacToe;