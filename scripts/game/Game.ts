/// <reference path="../../assets/types/linq.d.ts" />
import IBot from "./IBot";
import Board from "./Board";
import Move from "./Move";
import { List } from "../../assets/types/linq";

class Game {
    private _numberOfColors: number;
    private _boardSize: number;
    private _subsequenceSize: number;
    private _numberOfPlayerWhoseTurn: number;
    private _player1: IBot;
    private _player2: IBot;
    private _board: Board;
    private _winningMoves: List<Move>;
    private _noMoveForFirstPlayer: boolean;

    constructor(numberOfColors: number, boardSize: number, subsequenceSize: number) {
        this._numberOfColors = numberOfColors;
        this._boardSize = boardSize;
        this._subsequenceSize = subsequenceSize;
    }

    get winningMoves(): List<Move> {
        return this._winningMoves;
    }

    get noMoveForFirstPlayer(): boolean {
        return this._noMoveForFirstPlayer;
    }

    public setPlayers(player1: IBot, player2: IBot) {
        this._player1 = player1;
        this._player2 = player2;
    }

    public startGame() {
        if (this._player1 == null || this._player2 == null) {
            throw new Error("players not selected");
        }

        this._board = new Board(this._boardSize, this._numberOfColors, this._subsequenceSize);
        this._numberOfPlayerWhoseTurn = 1;
    }

    public isGameFinished(): boolean {        
        let result = this._board.checkIfFirstPlayerWins();
        // player 1 wins
        if (result != null) {
            return true;
        }
        // player 2 wins
        else if (this._board.checkIfSecondPlayerWins()) {
            return true;
        }
        return false;
    }
    
    public getResult(): any {
        let result = this._board.checkIfFirstPlayerWins();
        // player 1 wins
        if (result != null) {
            return result.Select(x => x.number).ToArray();
        }
        // player 2 wins
        else if (this._board.checkIfSecondPlayerWins()) {
            return true;
        }
        return false;
        
    }

    public nextStep(): Move {
        var move = null
        if (this._numberOfPlayerWhoseTurn == 1) {
            move = this._player1.getMove(this._board.clone());
            this._numberOfPlayerWhoseTurn = 2;
        } else if (this._numberOfPlayerWhoseTurn == 2) {
            move = this._player2.getMove(this._board.clone());
            this._numberOfPlayerWhoseTurn = 1;
        }
        this._board.applyMove(move);
        return move;
    }
}

export default Game