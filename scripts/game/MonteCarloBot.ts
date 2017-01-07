/// <reference path="../../assets/types/linq.d.ts" />

import Board from "./Board";
import Move from "./Move";
import IBot from "./IBot";
import { List } from "../../assets/types/linq";

class MonteCarloBot implements IBot {
    private _botNumber: number;

    constructor(botNumber: number) {
        if(botNumber == null || (botNumber != 1 && botNumber != 2)){
            throw new Error();
        }
        this._botNumber = botNumber;
    }

    public getMove(board: Board): Move {
        let moves: List<Move> = board.getAvailableMoves();
        let bestMove: Move;
        let bestMoveScore: number = -Infinity;

        moves.ForEach((value) => {
            let tempBoard: Board = board.clone()
            tempBoard.applyMove(value);

            let score: number = this._simulate(tempBoard)
            if (score > bestMoveScore) {
                bestMoveScore = score;
                bestMove = value;
            }
        })

        return bestMove;
    }



    private _simulate(board: Board): number {
        let gameToPlay: number = 100;
        let wonGames: number = 0;

        while (gameToPlay > 0) {
            if (this._simulate2(board.clone())) {
                wonGames++;
            }
            gameToPlay--;
        }
        return wonGames;
    }

    private _simulate2(board: Board): boolean {
        while (true) {
            let moves: List<Move> = board.getAvailableMoves();
            if (moves.Count() == 0) {
                if (this._botNumber == 1) {
                    return board.checkIfFirstPlayerWins() != null;
                } else if (this._botNumber == 2) {
                    return board.checkIfSecondPlayerWins();
                }
            }
            var move = this._getRandom(moves);
            board.applyMove(move);
        }
    }

    private _getRandom(moves: List<Move>): Move {
        var index = Math.floor(Math.random() * moves.Count());
        return moves.ElementAt(index);
    }
}

export default MonteCarloBot