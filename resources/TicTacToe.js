function TicTacToe() {
    this.board = ['','','','','','','','',''];
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
    return ((this.winner === '') &&
            (this.turn === player) &&
            (this.board[position] === ''))
}

TicTacToe.prototype.move = function(player, position) {
    if (this.isValidMove(player, position)) {
        var move= {};
        move[player] = position;
        this.moves.push(move)
    }
}

TicTacToe.prototype.turn = function() {
    
}

TicTacToe.prototype.validate = function() {

}

module.exports = TicTacToe;