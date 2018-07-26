// Tic Tac Toe tests
let should = require('chai').should();
let TicTacToe = require('../resources/TicTacToe.js');


describe('TicTacToe Tests', function() {
    let game;

    describe('isValidMove(...)', function() {
        before(function() {
            game = new TicTacToe();
        });
    
        afterEach(function() {
            game = new TicTacToe();
        });

        it('should not allow an invalid player', function() {
            game.isValidMove(undefined, 0).should.be.false;
            game.isValidMove(null, 0).should.be.false;
            game.isValidMove(-1, 0).should.be.false;
            game.isValidMove('', 0).should.be.false;
            game.isValidMove('z', 0).should.be.false;
        });

        it('should not allow a move previously taken', function() {
            game.move('x', 0);
            game.isValidMove('o', 0).should.be.false;
        })

        it('should not allow a move when there is already a winner', function() {
            game.move('x', 0);
            game.move('o', 1);
            game.move('x', 3);
            game.move('o', 2);
            game.move('x', 6);
            game.isValidMove('o', 8).should.be.false;
        });

        it('should not allow a move outside the bounds of the board', function() {
            game.isValidMove('x', 100).should.be.false;
            game.isValidMove('x', 9).should.be.false;
            game.isValidMove('x', -1).should.be.false;
            game.isValidMove('x', 'z').should.be.false;
        });

        it('should not allow a player to play out of order', function() {
            game.move('x', 0);
            game.isValidMove('x', 1).should.be.false;
            game.move('o', 1);
            game.isValidMove('o', 2).should.be.false;
        });
    });

    describe('move(...)', function() {
        before(function() {
            game = new TicTacToe();
        });
    
        afterEach(function() {
            game = new TicTacToe();
        });

        it('should stop invalid moves', function() {
           game.move('x', 0).should.be.true;
        });

        it('should record valid moves', function() {
            game.move('o', 0).should.be.false;
        });
    });

    describe('turn()', function() {
        before(function() {
            game = new TicTacToe();
        });
    
        afterEach(function() {
            game = new TicTacToe();
        });

        it('should return x on the first turn', function() {
            game.turn().should.equal('x');
        });

        it('should return x on every odd turn, starting from turn 1', function() {
            game.turn().should.equal('x');
            game.move('x', 1);
            game.move('o', 2);
            game.turn().should.equal('x');
            game.move('x', 3);
            game.move('o', 4);
            game.turn().should.equal('x');
        });

        it('should return o on every even turn, starting from turn 1', function() {
            game.move('x', 0).should.be.true;
            game.turn().should.equal('o');
            game.move('o', 2);
            game.move('x', 3);
            game.turn().should.equal('o');
            game.move('o', 4);
            game.move('x', 5);
            game.turn().should.equal('o');
        });

        it('should return an empty string if there is already a winner', function() {
            game.move('x', 0);
            game.move('o', 1);
            game.move('x', 3);
            game.move('o', 2);
            game.move('x', 6);
            game.winner.should.equal('x');
            game.turn().should.equal('');
        });

        it ('should return an empty string if there are no valid moves left', function() {
            game.move('x', 0);
            game.move('o', 1);
            game.move('x', 2);
            game.move('o', 3);
            game.move('x', 4);
            game.move('o', 6);
            game.move('x', 5);
            game.move('o', 8);
            game.move('x', 7);
            game.winner.should.equal('');
            game.turn().should.equal('');
        });
    });

    describe('evaluate()', function() {
        before(function() {
            game = new TicTacToe();
        });
    
        afterEach(function() {
            game = new TicTacToe();
        });

        it('should not have a winner before the first move', function() {
            game.evaluate().should.be.false;
            game.winner.should.equal('');
        });

        it('should not have a winner before the 5th move', function() {
            game.move('x', 0);
            game.move('o', 1);
            game.move('x', 3);
            game.move('o', 4);
            game.evaluate().should.be.false;
            game.winner.should.equal('');
        });

        it('should find x the winner', function() {
            game.move('x', 0);
            game.move('o', 1);
            game.move('x', 3);
            game.move('o', 4);
            game.evaluate().should.be.false;
            game.winner.should.equal('');
            game.move('x', 6);
            game.evaluate().should.be.true;
            game.winner.should.equal('x');
        });

        it('should find o the winner', function() {
            game.move('x', 0);
            game.move('o', 1);
            game.move('x', 3);
            game.move('o', 4);
            game.move('x', 8);
            game.evaluate().should.be.false;
            game.winner.should.equal('');
            game.move('o', 7)
            game.evaluate().should.be.true;
            game.winner.should.equal('o');
        });

        it('should find the first valid winner on move 5', function() {
            game.move('x', 0);
            game.move('o', 1);
            game.move('x', 3);
            game.move('o', 4);
            game.evaluate().should.be.false;
            game.winner.should.equal('');
            game.move('x', 6);
            game.evaluate().should.be.true;
            game.winner.should.equal('x');
        });

        it('should find the first valid winner on move 6', function() {
            game.move('x', 0);
            game.move('o', 1);
            game.move('x', 3);
            game.move('o', 4);
            game.move('x', 8);
            game.evaluate().should.be.false;
            game.winner.should.equal('');
            game.move('o', 7);
            game.evaluate().should.be.true;
            game.winner.should.equal('o');
        });

        it('should find the first valid winner on move 7', function() {
            game.move('x', 0);
            game.move('o', 1);
            game.move('x', 3);
            game.move('o', 4);
            game.move('x', 8);
            game.move('o', 2);
            game.evaluate().should.be.false;
            game.winner.should.equal('');
            game.move('x', 6);
            game.evaluate().should.be.true;
            game.winner.should.equal('x');
        });

        it('should find the first valid winner on move 8', function() {
            game.move('x', 0);
            game.move('o', 1);
            game.move('x', 3);
            game.move('o', 4);
            game.move('x', 8);
            game.move('o', 6);
            game.move('x', 2);
            game.evaluate().should.be.false;
            game.winner.should.equal('');
            game.move('o', 7);
            game.evaluate().should.be.true;
            game.winner.should.equal('o');
        });

        it('should find the first valid winner on move 9', function() {
            game.move('x', 0);
            game.move('o', 1);
            game.move('x', 2);
            game.move('o', 3);
            game.move('x', 4);
            game.move('o', 5);
            game.move('x', 7);
            game.move('o', 6);
            game.evaluate().should.be.false;
            game.move('x', 8);
            game.evaluate().should.be.true;
            game.winner.should.equal('x');
        });

        it('should find a winner via row 1', function() {
            game.move('x', 0);
            game.move('o', 3);
            game.move('x', 1);
            game.move('o', 4);
            game.evaluate().should.be.false;
            game.winner.should.equal('');
            game.move('x', 2);
            game.evaluate().should.be.true;
            game.winner.should.equal('x');
        });

        it('should find a winner via row 2', function() {
            game.move('x', 5);
            game.move('o', 1);
            game.move('x', 4);
            game.move('o', 2);
            game.evaluate().should.be.false;
            game.winner.should.equal('');
            game.move('x', 3);
            game.board[5].should.equal('x');
            game.board[4].should.equal('x');
            game.board[3].should.equal('x');
            game.evaluate().should.be.true;
            game.winner.should.equal('x');
        });

        it('should find a winner via row 3', function() {
            game.move('x', 8);
            game.move('o', 1);
            game.move('x', 7);
            game.move('o', 2);
            game.evaluate().should.be.false;
            game.winner.should.equal('');
            game.move('x', 6);
            game.evaluate().should.be.true;
            game.winner.should.equal('x');
        });

        it('should find a winner via column 1', function() {
            game.move('x', 0);
            game.move('o', 1);
            game.move('x', 3);
            game.move('o', 2);
            game.evaluate().should.be.false;
            game.winner.should.equal('');
            game.move('x', 6);
            game.evaluate().should.be.true;
            game.winner.should.equal('x');
        });

        it('should find a winner via column 2', function() {
            game.move('x', 1);
            game.move('o', 2);
            game.move('x', 7);
            game.move('o', 3);
            game.evaluate().should.be.false;
            game.winner.should.equal('');
            game.move('x', 4);
            game.evaluate().should.be.true;
            game.winner.should.equal('x');
        });

        it('should find a winner via column 3', function() {
            game.move('x', 8);
            game.move('o', 3);
            game.move('x', 5);
            game.move('o', 1);
            game.evaluate().should.be.false;
            game.winner.should.equal('');
            game.move('x', 2);
            game.evaluate().should.be.true;
            game.winner.should.equal('x');
        });

        it('should find a winner via diagonal right', function() {
            game.move('x', 0);
            game.move('o', 1);
            game.move('x', 4);
            game.move('o', 2);
            game.evaluate().should.be.false;
            game.winner.should.equal('');
            game.move('x', 8);
            game.evaluate().should.be.true;
            game.winner.should.equal('x');
        });

        it('should find a winner via diagonal left', function() {
            game.move('x', 6);
            game.move('o', 1);
            game.move('x', 4);
            game.move('o', 3);
            game.evaluate().should.be.false;
            game.winner.should.equal('');
            game.move('x', 2);
            game.evaluate().should.be.true;
            game.winner.should.equal('x');
        });
    });
})