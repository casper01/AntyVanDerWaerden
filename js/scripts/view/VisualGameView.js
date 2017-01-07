define(["require", "exports", "./GameManager", "../utils/Interval"], function (require, exports, GameManager_1, Interval_1) {
    "use strict";
    class VisualGameView {
        constructor() {
            this.stepDelta = 500;
            this.gameManager = new GameManager_1.default("game", "solution");
        }
        static getInstance() {
            if (VisualGameView.instance === undefined) {
                VisualGameView.instance = new VisualGameView();
            }
            return VisualGameView.instance;
        }
        show() {
            this.gameManager.resetGame();
            $("#game").css("display", "block");
            $("#visual-game-mode").css("display", "block");
        }
        hide() {
            $("#game").css("display", "none");
            $("#visual-game-mode").css("display", "none");
        }
        startVisualGame(n, k, c, player1, player2) {
            this.gameManager.startNewGame(n, k, c, player1, player2);
            Interval_1.default.setInterval(function () {
                VisualGameView.getInstance().gameManager.nextStep();
                if (VisualGameView.getInstance().gameManager.isGameFinished()) {
                    Interval_1.default.clearInterval();
                }
            }, VisualGameView.getInstance().stepDelta);
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = VisualGameView;
});
//# sourceMappingURL=VisualGameView.js.map