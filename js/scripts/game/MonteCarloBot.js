/// <reference path="../../assets/types/linq.d.ts" />
define(["require", "exports"], function (require, exports) {
    "use strict";
    class MonteCarloBot {
        constructor(botNumber) {
            if (botNumber == null || (botNumber != 1 && botNumber != 2)) {
                throw new Error();
            }
            this._botNumber = botNumber;
        }
        getMove(board) {
            let moves = board.getAvailableMoves();
            let bestMove;
            let bestMoveScore = 0;
            moves.ForEach((value) => {
                let tempBoard = board.clone();
                tempBoard.applyMove(value);
                let score = this._simulate(tempBoard);
                if (score > bestMoveScore) {
                    bestMoveScore = score;
                    bestMove = value;
                }
            });
            return bestMove;
        }
        _simulate(board) {
            let gameToPlay = 100;
            let wonGames = 0;
            while (gameToPlay > 0) {
                if (this._simulate2(board.clone())) {
                    wonGames++;
                }
                gameToPlay--;
            }
            return wonGames;
        }
        _simulate2(board) {
            while (true) {
                let moves = board.getAvailableMoves();
                if (moves.Count() == 0) {
                    if (this._botNumber == 1) {
                        return board.checkIfFirstPlayerWins() != null;
                    }
                    else if (this._botNumber == 2) {
                        return board.checkIfSecondPlayerWins();
                    }
                }
                var move = this._getRandom(moves);
                board.applyMove(move);
            }
        }
        _getRandom(moves) {
            var index = Math.floor(Math.random() * moves.Count());
            return moves.ElementAt(index);
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = MonteCarloBot;
});
//# sourceMappingURL=MonteCarloBot.js.map