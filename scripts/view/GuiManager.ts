import Validator from "../utils/Validator";
import GameManager from "./GameManager"
import Interval from "../utils/Interval"
import IBot from "../game/IBot";
import MonteCarloBot from "../game/MonteCarloBot";
import RandomBot from "../game/RandomBot";
import MessageBox from "../utils/MessagBox";
import ProgressBar from "./ProgressBar";
import Timer from "../utils/Timer";
import StatisticsView from "./StatisticsView";
import VisualGameView from "./VisualGameView";
import StepGameView from "./StepGameView";

/** Static class used to manage GUI of application **/
class GuiManager {
    private static gameManager = new GameManager("game", "solution");
    private static statisticsView : StatisticsView;
    private static visualGameView : VisualGameView;
    private static stepGameView : StepGameView;
    
    private constructor() { }

    public static getN() : number {
        return parseInt($("#n").val());
    }

    public static getK() : number {
        return parseInt($("#k").val());
    }

    public static getC() : number {
        return parseInt($("#c").val());
    }

    private static getTestsCount() : number {
        return parseInt($("#tests-count").val());
    }

    public static init() {
        GuiManager.statisticsView = StatisticsView.getInstance();
        GuiManager.visualGameView = VisualGameView.getInstance();
        GuiManager.stepGameView = StepGameView.getInstance();
        GuiManager.initBots();
        GuiManager.switchMode("fastGame");
        $("#start-fast-game")[0].click();
    }

    public static switchMode(mode : string) {
        GuiManager.gameManager.resetGame();
        Interval.clearInterval();

        switch(mode) {
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
                MessageBox.show("Clicked option does not exist!");
                break;
        }
    }

    /** Visual game for user **/
    public static startVisualGame() {
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

    public static startStepByStepGame() {
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
    public static simulateNextStep() {
        GuiManager.stepGameView.simulateNextStep();
    }

    public static validateInputValues() : boolean {
        let n : number = parseInt($("#n").val());
        let k : number = parseInt($("#k").val());
        let c : number = parseInt($("#c").val());

        let result = Validator.validate_nkc(n, k, c);
        if (result != true) {
            MessageBox.show(result);
            return false;
        }
        return true;
    }

    public static validateTestsCount() {
        let tests : number = parseInt($("#tests-count").val());
        let result = Validator.validate_test(tests);
        if (result != true) {
            MessageBox.show(result);
            return false;
        }
        return true;
    }

    public static runStatistics() {
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

    public static getPlayer1() {
        let selectedValue = $("#bot1Select").val();
        let botNumber = 1;
        return GuiManager.botValueToInstance(selectedValue, botNumber);
    }

    public static getPlayer2() {
        let selectedValue = $("#bot2Select").val();
        let botNumber = 2;
        return GuiManager.botValueToInstance(selectedValue, botNumber);
    }

    /** Displays info that game is over and which player won **/
    public static displayWonInfo(playerWon : number) {
        $("#solution").html('<p><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span><strong>The End!</strong> Player ' + playerWon + ' won!<p>');
        $("#solution").show( "drop", {}, 400, function() {} );
        $("#solution").effect( "shake", {}, 400, function() {} );
        setTimeout(function() {
            $("#solution").effect( "drop", {}, 400, function() {} );
        }, 5000);
    }

    private static botValueToInstance(botValue : string, botNumber : number) {
        switch(botValue) {
            case "MonteCarloBot":
                return new MonteCarloBot(botNumber);
            case "RandomBot":
                return new RandomBot();
            default:
                MessageBox.show("Invalid name of bot " + botNumber + ". Using Random Bot");
                return new RandomBot();
        }
    }

    /** Inserts bots info into to dropdowns **/
    private static initBots() {
        $("#bot1Select").append(new Option("Random Bot", "RandomBot"));
        $("#bot1Select").append(new Option("Monte Carlo Bot", "MonteCarloBot"));
        $('#bot1Select').selectmenu("refresh")

        $("#bot2Select").append(new Option("Random Bot", "RandomBot"));
        $("#bot2Select").append(new Option("Monte Carlo Bot", "MonteCarloBot"));
        $('#bot2Select').selectmenu("refresh")
    }
}

export default GuiManager;