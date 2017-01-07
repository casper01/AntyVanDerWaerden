/// <reference path="../../assets/types/linq.d.ts" />

import Board from "./Board";
import Move from "./Move";
import IBot from "./IBot";
import { List } from "../../assets/types/linq";

class RandomBot implements IBot {
    getMove(board: Board): Move {
        var moves = board.getAvailableMoves();
        if(moves == null)
            return null;

        var index = Math.floor(Math.random()*moves.Count());
        return moves.ElementAt(index);
    }
}

export default RandomBot