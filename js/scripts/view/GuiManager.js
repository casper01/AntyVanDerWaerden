define(["require", "exports", "../utils/Validator", "./GameManager", "../utils/Interval", "../game/MonteCarloBot", "../game/RandomBot", "../utils/MessagBox", "./StatisticsView", "./VisualGameView", "./StepGameView"], function (require, exports, Validator_1, GameManager_1, Interval_1, MonteCarloBot_1, RandomBot_1, MessagBox_1, StatisticsView_1, VisualGameView_1, StepGameView_1) {
    "use strict";
    /** Static class used to manage GUI of application **/
    class GuiManager {
        constructor() { }
        static getN() {
            return parseInt($("#n").val());
        }
        static getK() {
            return parseInt($("#k").val());
        }
        static getC() {
            return parseInt($("#c").val());
        }
        static getTestsCount() {
            return parseInt($("#tests-count").val());
        }
        static init() {
            GuiManager.statisticsView = StatisticsView_1.default.getInstance();
            GuiManager.visualGameView = VisualGameView_1.default.getInstance();
            GuiManager.stepGameView = StepGameView_1.default.getInstance();
            GuiManager.initBots();
            GuiManager.switchMode("fastGame");
            $("#start-fast-game")[0].click();
        }
        static switchMode(mode) {
            GuiManager.gameManager.resetGame();
            Interval_1.default.clearInterval();
            switch (mode) {
                case "fastGame":
                    GuiManager.stepGameView.hide();
                    GuiManager.statisticsView.hide();
                    GuiManager.visualGameView.show();
                    break;
                case "stepGame":
                    GuiManager.visualGameView.hide();
                    GuiManager.statisticsView.hide();
                    GuiManager.stepGameView.show();
                    break;
                case "statistics":
                    GuiManager.stepGameView.hide();
                    GuiManager.visualGameView.hide();
                    GuiManager.statisticsView.show();
                    break;
                default:
                    MessagBox_1.default.show("Clicked option does not exist!");
                    break;
            }
        }
        /** Visual game for user **/
        static startVisualGame() {
            let n = GuiManager.getN();
            let k = GuiManager.getK();
            let c = GuiManager.getC();
            let player1 = GuiManager.getPlayer1();
            let player2 = GuiManager.getPlayer2();
            if (!GuiManager.validateInputValues()) {
                return;
            }
            GuiManager.visualGameView.startVisualGame(n, k, c, player1, player2);
        }
        static startStepByStepGame() {
            let n = GuiManager.getN();
            let k = GuiManager.getK();
            let c = GuiManager.getC();
            let player1 = GuiManager.getPlayer1();
            let player2 = GuiManager.getPlayer2();
            if (!GuiManager.validateInputValues()) {
                return;
            }
            GuiManager.stepGameView.startStepByStepGame(n, k, c, player1, player2);
        }
        /** Simulates next step in step by step game **/
        static simulateNextStep() {
            GuiManager.stepGameView.simulateNextStep();
        }
        static validateInputValues() {
            let n = parseInt($("#n").val());
            let k = parseInt($("#k").val());
            let c = parseInt($("#c").val());
            let result = Validator_1.default.validate_nkc(n, k, c);
            if (result != true) {
                MessagBox_1.default.show(result);
                return false;
            }
            return true;
        }
        static validateTestsCount() {
            let tests = parseInt($("#tests-count").val());
            let result = Validator_1.default.validate_test(tests);
            if (result != true) {
                MessagBox_1.default.show(result);
                return false;
            }
            return true;
        }
        static runStatistics() {
            if (!GuiManager.validateInputValues()) {
                return;
            }
            if (!GuiManager.validateTestsCount()) {
                return;
            }
            let n = GuiManager.getN();
            let k = GuiManager.getK();
            let c = GuiManager.getC();
            let player1 = GuiManager.getPlayer1();
            let player2 = GuiManager.getPlayer2();
            let tests = GuiManager.getTestsCount();
            GuiManager.statisticsView.runStatistics(n, k, c, tests, player1, player2);
        }
        static getPlayer1() {
            let selectedValue = $("#bot1Select").val();
            let botNumber = 1;
            return GuiManager.botValueToInstance(selectedValue, botNumber);
        }
        static getPlayer2() {
            let selectedValue = $("#bot2Select").val();
            let botNumber = 2;
            return GuiManager.botValueToInstance(selectedValue, botNumber);
        }
        /** Displays info that game is over and which player won **/
        static displayWonInfo(playerWon) {
            $("#solution").html('<p><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span><strong>The End!</strong> Player ' + playerWon + ' won!<p>');
            $("#solution").show("drop", {}, 400, function () { });
            $("#solution").effect("shake", {}, 400, function () { });
            setTimeout(function () {
                $("#solution").effect("drop", {}, 400, function () { });
            }, 5000);
        }
        static botValueToInstance(botValue, botNumber) {
            switch (botValue) {
                case "MonteCarloBot":
                    return new MonteCarloBot_1.default(botNumber);
                case "RandomBot":
                    return new RandomBot_1.default();
                default:
                    MessagBox_1.default.show("Invalid name of bot " + botNumber + ". Using Random Bot");
                    return new RandomBot_1.default();
            }
        }
        /** Inserts bots info into to dropdowns **/
        static initBots() {
            $("#bot1Select").append(new Option("Random Bot", "RandomBot"));
            $("#bot1Select").append(new Option("Monte Carlo Bot", "MonteCarloBot"));
            $('#bot1Select').selectmenu("refresh");
            $("#bot2Select").append(new Option("Random Bot", "RandomBot"));
            $("#bot2Select").append(new Option("Monte Carlo Bot", "MonteCarloBot"));
            $('#bot2Select').selectmenu("refresh");
        }
    }
    GuiManager.gameManager = new GameManager_1.default("game", "solution");
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = GuiManager;
});
//# sourceMappingURL=GuiManager.js.map