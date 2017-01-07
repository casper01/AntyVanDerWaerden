import Board from "./Board";
import Move from "./Move";

interface IBot {
    getMove(board: Board): Move;
}

export default IBot