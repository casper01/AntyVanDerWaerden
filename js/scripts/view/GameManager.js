define(["require", "exports", "./DynamicDiv", "../game/Game", "./ColorGenerator", "./GuiManager"], function (require, exports, DynamicDiv_1, Game_1, ColorGenerator_1, GuiManager_1) {
    "use strict";
    class GameManager {
        constructor(gameContainerId, solutionContainerId) {
            this.gameContainerId = gameContainerId;
            this.solutionContainerId = solutionContainerId;
            this.gameStarted = false;
            this.playedSteps = 0;
        }
        startNewGame(n, k, c, player1, player2) {
            this.gameStarted = true;
            this.resetGame();
            this.generateDivs(n);
            this.generateDivColors(c);
            this.game = new Game_1.default(c, n, k);
            this.player1 = player1;
            this.player2 = player2;
            this.game.setPlayers(this.player1, this.player2);
            this.game.startGame();
        }
        startNonVisualGame(n, k, c, player1, player2) {
            this.gameStarted = true;
            this.resetGame();
            this.game = new Game_1.default(c, n, k);
            this.player1 = player1;
            this.player2 = player2;
            this.game.setPlayers(this.player1, this.player2);
            this.game.startGame();
        }
        getPlayedSteps() {
            return this.playedSteps;
        }
        isGameFinished() {
            return !this.gameStarted ? !this.gameStarted : this.game.isGameFinished();
        }
        resetGame() {
            $(this.getJqueryId(this.gameContainerId)).html("");
            this.playedSteps = 0;
        }
        hasPlayer1Won() {
            if (!(this.game !== undefined && this.game.isGameFinished()))
                return false;
            let result = this.game.getResult();
            if (result == true) {
                return false;
            }
            else {
                return true;
            }
        }
        nextStep() {
            let move = this.game.nextStep();
            let number = move.number;
            let color = move.color;
            this.divs[number].changeColor(this.divColors[color]);
            if (this.game.isGameFinished()) {
                this.gameStarted = false;
                this.updateLastGameResult();
            }
            this.playedSteps++;
        }
        nextNonVisualStep() {
            let move = this.game.nextStep();
            if (this.game.isGameFinished()) {
                this.gameStarted = false;
            }
            this.playedSteps++;
        }
        updateLastGameResult() {
            let result = this.game.getResult();
            if (result == true) {
                GuiManager_1.default.displayWonInfo(2);
            }
            else {
                for (var i = 0; i < result.length; i++) {
                    this.divs[result[i]].changeBorder();
                }
                GuiManager_1.default.displayWonInfo(1);
            }
        }
        getJqueryId(id) {
            return "#" + id;
        }
        generateDivColors(count) {
            let cg = new ColorGenerator_1.default(count);
            this.divColors = cg.generate();
        }
        generateDivs(count) {
            this.divs = [];
            for (var i = 0; i < count; i++) {
                let div = new DynamicDiv_1.default(i + 1);
                div.addToHtml(this.gameContainerId);
                this.divs.push(div);
            }
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = GameManager;
});
//# sourceMappingURL=GameManager.js.map