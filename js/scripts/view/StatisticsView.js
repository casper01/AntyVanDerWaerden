define(["require", "exports", "./ProgressBar", "../utils/Timer", "./GameManager"], function (require, exports, ProgressBar_1, Timer_1, GameManager_1) {
    "use strict";
    class StatisticsView {
        static getInstance() {
            if (StatisticsView.instance === undefined) {
                StatisticsView.instance = new StatisticsView();
            }
            return StatisticsView.instance;
        }
        constructor() {
            this.hideSolutionInfo();
            this.gameManager = new GameManager_1.default("game", "solution");
        }
        show() {
            this.gameManager.resetGame();
            $("#statistics-mode").css("display", "block");
            this.showStatistics(false);
            ProgressBar_1.default.set(0);
        }
        hide() {
            clearInterval(this.progressbarInterval);
            $("#statistics-mode").css("display", "none");
        }
        runStatistics(n, k, c, tests, player1, player2) {
            clearInterval(this.progressbarInterval);
            this.showStatistics(false);
            ProgressBar_1.default.set(0);
            let p1pts = 0;
            let p2pts = 0;
            let gamesNeededData = [];
            let i = 0;
            let timer = new Timer_1.default();
            timer.start();
            this.progressbarInterval = setInterval(function () {
                i++;
                let p1won = StatisticsView.getInstance().startFastGame(n, k, c, player1, player2);
                ProgressBar_1.default.set(Math.round(i * 100 / tests));
                if (p1won) {
                    p1pts++;
                }
                else {
                    p2pts++;
                }
                let markerCol = p1won ? "blue" : "red";
                gamesNeededData.push({ x: i, y: StatisticsView.getInstance().gameManager.getPlayedSteps(), markerColor: markerCol, lineColor: "white" });
                if (i == tests) {
                    timer.stop();
                    clearInterval(StatisticsView.getInstance().progressbarInterval);
                    $("#p1-won").text(String(p1pts));
                    $("#p2-won").text(String(p2pts));
                    $("#played-games").text(String(tests));
                    $("#elapsed-time").text(String(timer.elapsedSeconds().toFixed(3)));
                    StatisticsView.getInstance().showStatistics(true);
                    ProgressBar_1.default.set(100);
                    StatisticsView.getInstance().displayPlayersPercentageChart(Math.round(100 * p1pts / tests));
                    StatisticsView.getInstance().displayGamesWonChart(gamesNeededData);
                }
            }, 0);
        }
        displayGamesWonChart(gamesNeededData) {
            $("#games-won-chartContainer").CanvasJSChart({
                backgroundColor: "transparent",
                theme: "theme4",
                title: {
                    text: "Rounds needed to win for each game"
                },
                axisX: {
                    title: "Number of game",
                },
                axisY: {
                    title: "Winning round",
                },
                data: [
                    {
                        type: "line",
                        dataPoints: gamesNeededData
                    }
                ]
            });
        }
        displayPlayersPercentageChart(p1winPercent) {
            $("#players-percentage-chartContainer").CanvasJSChart({
                backgroundColor: "transparent",
                interactivityEnabled: false,
                theme: "theme4",
                title: {
                    text: "Percentage of winning",
                    fontSize: 24
                },
                legend: {
                    verticalAlign: "center",
                    horizontalAlign: "left"
                },
                data: [
                    {
                        type: "pie",
                        showInLegend: true,
                        toolTipContent: "{label} <br/> {y} %",
                        indexLabel: "{y} %",
                        dataPoints: [
                            { label: "Player 1", y: p1winPercent, legendText: "Player 1 (" + String(p1winPercent) + "%)", color: "blue" },
                            { label: "Player 2", y: 100 - p1winPercent, legendText: "Player 2 (" + String(100 - p1winPercent) + "%)", color: "red" },
                        ],
                    }
                ]
            });
        }
        startFastGame(n, k, c, player1, player2) {
            this.gameManager.startNonVisualGame(n, k, c, player1, player2);
            while (!this.gameManager.isGameFinished()) {
                this.gameManager.nextNonVisualStep();
            }
            return this.gameManager.hasPlayer1Won();
        }
        /** Shows statistics info or results of last run **/
        showStatistics(showResults) {
            clearInterval(this.progressbarInterval);
            if (showResults) {
                $("#computed-statistics").css("display", "block");
                $("#statistics-info").css("display", "none");
            }
            else {
                $("#computed-statistics").css("display", "none");
                $("#players-percentage-chartContainer").html("");
                $("#games-won-chartContainer").html("");
                $("#statistics-info").css("display", "block");
            }
        }
        hideSolutionInfo() {
            $("#solution").hide();
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = StatisticsView;
});
//# sourceMappingURL=StatisticsView.js.map