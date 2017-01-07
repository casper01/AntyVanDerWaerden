define(["require", "exports"], function (require, exports) {
    "use strict";
    class Move {
        constructor(number, color) {
            this._number = number;
            this._color = color;
        }
        equals(move) {
            return this._color == move._color && this._number == move._number;
        }
        sameColor(color) {
            return this._color == color;
        }
        get number() {
            return this._number;
        }
        get color() {
            return this._color;
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Move;
});
//# sourceMappingURL=Move.js.map