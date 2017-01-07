/// <reference path="../../assets/types/linq.d.ts" />
define(["require", "exports", "../../assets/types/linq", "./Move"], function (require, exports, linq_1, Move_1) {
    "use strict";
    //TODO: linq - może się przydać przy kolekcjach
    //http://kutyel.github.io/linq.ts/docs/classes/list/index.html
    class Board {
        constructor(sizeBoard, numberOfColors, subsequenceSize) {
            this._numberOfColors = numberOfColors;
            this._subsequenceSize = subsequenceSize;
            this._data = new Array();
            for (var i = 0; i < sizeBoard; i++) {
                this._data.push(undefined);
            }
        }
        getAvailableMoves() {
            if (this._data == null || this._numberOfColors == null) {
                throw new Error();
            }
            var availableMoves = new linq_1.List();
            for (var position = 0; position < this._data.length; position++) {
                if (this._data[position] != undefined) {
                    continue;
                }
                for (var color = 0; color < this._numberOfColors; color++) {
                    availableMoves.Add(new Move_1.default(position, color));
                }
            }
            return availableMoves;
        }
        checkIfFirstPlayerWins() {
            let numberOfElements = this._data.length;
            for (let diff = 1; diff < numberOfElements; diff++) {
                let subsequence = new linq_1.List();
                let map = {};
                for (let i = 0; i < this._data.length; i = i + diff) {
                    if (this._data[i] == undefined) {
                        subsequence = new linq_1.List();
                        map = {};
                        continue;
                    }
                    if (map[this._data[i]] != undefined) {
                        subsequence = subsequence.SkipWhile((value, index) => {
                            let result = value.color != this._data[i];
                            if (result) {
                                delete map[value.color];
                            }
                            return result;
                        });
                        let first = subsequence.First();
                        delete map[first.color];
                        subsequence = subsequence.Skip(1);
                    }
                    subsequence.Add(new Move_1.default(i, this._data[i]));
                    map[this._data[i]] = i;
                    if (subsequence.Count() == this._subsequenceSize && Object.keys(map).length == this._subsequenceSize) {
                        return subsequence;
                    }
                }
            }
            return null;
        }
        checkIfSecondPlayerWins() {
            let numberOfElements = this._data.length;
            for (let diff = 1; diff < numberOfElements; diff++) {
                let subsequence = new linq_1.List();
                let map = {};
                for (let i = 0; i < this._data.length; i = i + diff) {
                    if (this._data[i] != undefined && map[this._data[i]] != undefined) {
                        subsequence = subsequence.SkipWhile((value, index) => {
                            let result = value.color != this._data[i];
                            if (result) {
                                delete map[value.color];
                            }
                            return result;
                        });
                        let first = subsequence.First();
                        delete map[first.color];
                        subsequence = subsequence.Skip(1);
                    }
                    subsequence.Add(new Move_1.default(i, this._data[i]));
                    map[this._data[i]] = i;
                    if (subsequence.Count() == this._subsequenceSize) {
                        return false;
                    }
                }
            }
            return true;
        }
        checkIfAllTurnsPassed() {
            if (this.getAvailableMoves().Count() == 0)
                return true;
            return false;
        }
        applyMove(move) {
            if (move == null) {
                throw new Error("move is null");
            }
            if (this._data[move.number] != undefined || move.color >= this._numberOfColors) {
                throw new Error("illegal move");
            }
            this._data[move.number] = move.color;
            return true;
        }
        clone() {
            var result = new Board(this._data.length, this._numberOfColors, this._subsequenceSize);
            for (var i = 0; i < this._data.length; i++) {
                result._data[i] = this._data[i];
            }
            return result;
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Board;
});
//# sourceMappingURL=Board.js.map