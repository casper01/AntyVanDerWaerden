/// <reference path="../../assets/types/linq.d.ts" />

import { List, Enumerable } from "../../assets/types/linq";
import Move from "./Move";

//TODO: linq - może się przydać przy kolekcjach
//http://kutyel.github.io/linq.ts/docs/classes/list/index.html

class Board {
    private _data: Array<number>;
    private _numberOfColors: number;
    private _subsequenceSize: number;
    constructor(sizeBoard: number, numberOfColors: number, subsequenceSize: number) {
        this._numberOfColors = numberOfColors;
        this._subsequenceSize = subsequenceSize;

        this._data = new Array<number>();
        for (var i = 0; i < sizeBoard; i++) {
            this._data.push(undefined);
        }
    }

    public getAvailableMoves(): List<Move> {
        if (this._data == null || this._numberOfColors == null) {
            throw new Error();
        }
        var availableMoves = new List<Move>();
        for (var position = 0; position < this._data.length; position++) {
            if (this._data[position] != undefined) {
                continue;
            }
            for (var color = 0; color < this._numberOfColors; color++) {
                availableMoves.Add(new Move(position, color));
            }
        }
        return availableMoves;
    }

    checkIfFirstPlayerWins(): List<Move> {
        let numberOfElements: number = this._data.length;

        for (let diff: number = 1; diff < numberOfElements; diff++) {
            let subsequence: List<Move> = new List<Move>();
            let map: { [color: number]: number; } = {};

            for (let i: number = 0; i < this._data.length; i = i + diff) {
                if (this._data[i] == undefined) {
                    subsequence = new List<Move>();
                    map = {};
                    continue;
                }
                if (map[this._data[i]] != undefined) {
                    subsequence = subsequence.SkipWhile((value, index) => {
                        let result: boolean = value.color != this._data[i];
                        if (result) {
                            delete map[value.color];
                        }
                        return result;
                    });
                    let first = subsequence.First();
                    delete map[(<Move>first).color];
                    subsequence = subsequence.Skip(1);
                }
                subsequence.Add(new Move(i, this._data[i]));
                map[this._data[i]] = i;

                if (subsequence.Count() == this._subsequenceSize && Object.keys(map).length == this._subsequenceSize) {
                    return subsequence;
                }
            }
        }
        return null;
    }

    checkIfSecondPlayerWins(): boolean {
        let numberOfElements: number = this._data.length;

        for (let diff: number = 1; diff < numberOfElements; diff++) {
            let subsequence: List<Move> = new List<Move>();
            let map: { [color: number]: number; } = {};

            for (let i: number = 0; i < this._data.length; i = i + diff) {
                if (this._data[i] != undefined && map[this._data[i]] != undefined) {
                    subsequence = subsequence.SkipWhile((value, index) => {
                        let result: boolean = value.color != this._data[i];
                        if (result) {
                            delete map[value.color];
                        }
                        return result;
                    });
                    let first = subsequence.First();
                    delete map[(<Move>first).color];
                    subsequence = subsequence.Skip(1);
                }
                subsequence.Add(new Move(i, this._data[i]));
                map[this._data[i]] = i;

                if (subsequence.Count() == this._subsequenceSize) {
                    return false;
                }
            }
        }
        return true;
    }

    checkIfAllTurnsPassed(): boolean {
        if (this.getAvailableMoves().Count() == 0)
            return true;
        return false;
    }

    public applyMove(move: Move): boolean {
        if (move == null) {
            throw new Error("move is null");
        }
        if (this._data[move.number] != undefined || move.color >= this._numberOfColors) {
            throw new Error("illegal move");
        }
        this._data[move.number] = move.color;
        return true;
    }

    public clone(): Board {
        var result = new Board(this._data.length, this._numberOfColors, this._subsequenceSize);
        for (var i = 0; i < this._data.length; i++) {
            result._data[i] = this._data[i];
        }
        return result;
    }
}

export default Board