import View from "./View";
import IBot from "../game/IBot";
import GameManager from "./GameManager";

class StepGameView implements View {
    private static instance : StepGameView;
    private gameManager : GameManager;

    public static getInstance() {
        if (StepGameView.instance === undefined) {
            StepGameView.instance = new StepGameView();
        }
        return StepGameView.instance;
    }

    public constructor() {
        this.gameManager = new GameManager("game", "solution");
        this.enableNextStepButton(false);
    }

    public show() {
        this.gameManager.resetGame();
        $("#game").css("display", "block");
        $("#step-game-mode").css("display", "block");
        this.enableNextStepButton(false);
    }

    public hide() {
        $("#game").css("display", "none");
        $("#step-game-mode").css("display", "none");
        this.enableNextStepButton(false);
    }

    public startStepByStepGame(n : number, k : number, c : number, player1 : IBot, player2 : IBot) {
        this.enableNextStepButton(false);
        this.gameManager.startNewGame(n, k, c, player1, player2);
        this.enableNextStepButton(true);
    }

    public simulateNextStep() {
        this.gameManager.nextStep();

        if (this.gameManager.isGameFinished()) {
            this.enableNextStepButton(false);
        }
    }

    /** Enables or disables next step button **/
    private enableNextStepButton(enable : boolean) {
        if (enable) {
            $("#nextStepButton").attr("disabled", false);
        }
        else {
            $("#nextStepButton").attr("disabled", true);
        }
    }
}

export default StepGameView;