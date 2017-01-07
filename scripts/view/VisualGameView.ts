import View from "./View";
import IBot from "../game/IBot";
import GameManager from "./GameManager";
import Interval from "../utils/Interval";

class VisualGameView implements View {
    private static instance : VisualGameView;
    private gameManager : GameManager;
    private stepDelta : number = 500;

    public static getInstance() {
        if (VisualGameView.instance === undefined) {
            VisualGameView.instance = new VisualGameView();
        }
        return VisualGameView.instance;
    }

    public constructor() {
        this.gameManager = new GameManager("game", "solution");
    }

    public show() {
        this.gameManager.resetGame();
        $("#game").css("display", "block");
        $("#visual-game-mode").css("display", "block");
    }

    public hide() {
        $("#game").css("display", "none");
        $("#visual-game-mode").css("display", "none");
    }

    public startVisualGame(n : number, k : number, c : number, player1 : IBot, player2 : IBot) {
        this.gameManager.startNewGame(n, k, c, player1, player2);
        Interval.setInterval(function() {
            VisualGameView.getInstance().gameManager.nextStep();
            if (VisualGameView.getInstance().gameManager.isGameFinished()) {
                Interval.clearInterval();
            }
        }, VisualGameView.getInstance().stepDelta);
    }
}

export default VisualGameView;