define(["require", "exports", "./Board"], function (require, exports, Board_1) {
    "use strict";
    class Game {
        constructor(numberOfColors, boardSize, subsequenceSize) {
            this._numberOfColors = numberOfColors;
            this._boardSize = boardSize;
            this._subsequenceSize = subsequenceSize;
        }
        get winningMoves() {
            return this._winningMoves;
        }
        get noMoveForFirstPlayer() {
            return this._noMoveForFirstPlayer;
        }
        setPlayers(player1, player2) {
            this._player1 = player1;
            this._player2 = player2;
        }
        startGame() {
            if (this._player1 == null || this._player2 == null) {
                throw new Error("players not selected");
            }
            this._board = new Board_1.default(this._boardSize, this._numberOfColors, this._subsequenceSize);
            this._numberOfPlayerWhoseTurn = 1;
        }
        isGameFinished() {
            let result = this._board.checkIfFirstPlayerWins();
            // player 1 wins
            if (result != null) {
                return true;
            }
            else if (this._board.checkIfSecondPlayerWins()) {
                return true;
            }
            return false;
        }
        getResult() {
            let result = this._board.checkIfFirstPlayerWins();
            // player 1 wins
            if (result != null) {
                return result.Select(x => x.number).ToArray();
            }
            else if (this._board.checkIfSecondPlayerWins()) {
                return true;
            }
            return false;
        }
        nextStep() {
            var move = null;
            if (this._numberOfPlayerWhoseTurn == 1) {
                move = this._player1.getMove(this._board.clone());
                this._numberOfPlayerWhoseTurn = 2;
            }
            else if (this._numberOfPlayerWhoseTurn == 2) {
                move = this._player2.getMove(this._board.clone());
                while (move === undefined) {
                    move = this._player1.getMove(this._board.clone());
                }
                this._numberOfPlayerWhoseTurn = 1;
            }
            this._board.applyMove(move);
            return move;
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Game;
});
//# sourceMappingURL=Game.js.map