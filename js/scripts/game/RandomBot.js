/// <reference path="../../assets/types/linq.d.ts" />
define(["require", "exports"], function (require, exports) {
    "use strict";
    class RandomBot {
        getMove(board) {
            var moves = board.getAvailableMoves();
            if (moves == null)
                return null;
            var index = Math.floor(Math.random() * moves.Count());
            return moves.ElementAt(index);
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = RandomBot;
});
//# sourceMappingURL=RandomBot.js.map