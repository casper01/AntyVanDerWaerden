define(["require", "exports", "./GameManager"], function (require, exports, GameManager_1) {
    "use strict";
    class StepGameView {
        static getInstance() {
            if (StepGameView.instance === undefined) {
                StepGameView.instance = new StepGameView();
            }
            return StepGameView.instance;
        }
        constructor() {
            this.gameManager = new GameManager_1.default("game", "solution");
            this.enableNextStepButton(false);
        }
        show() {
            this.gameManager.resetGame();
            $("#game").css("display", "block");
            $("#step-game-mode").css("display", "block");
            this.enableNextStepButton(false);
        }
        hide() {
            $("#game").css("display", "none");
            $("#step-game-mode").css("display", "none");
            this.enableNextStepButton(false);
        }
        startStepByStepGame(n, k, c, player1, player2) {
            this.enableNextStepButton(false);
            this.gameManager.startNewGame(n, k, c, player1, player2);
            this.enableNextStepButton(true);
        }
        simulateNextStep() {
            this.gameManager.nextStep();
            if (this.gameManager.isGameFinished()) {
                this.enableNextStepButton(false);
            }
        }
        /** Enables or disables next step button **/
        enableNextStepButton(enable) {
            if (enable) {
                $("#nextStepButton").attr("disabled", false);
            }
            else {
                $("#nextStepButton").attr("disabled", true);
            }
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = StepGameView;
});
//# sourceMappingURL=StepGameView.js.map