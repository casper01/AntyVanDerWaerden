/// <reference path="assets/types/require.d.ts" />
/// <reference path="assets/types/jquery.d.ts" />
import GuiManager from "./scripts/view/GuiManager"


require([], () => {
    $(document).ready(function() {
        GuiManager.init();

        $("#startButton").click(function() {
            GuiManager.startVisualGame();
        });

        $("#startByStepButton").click(function() {
            GuiManager.startStepByStepGame();
        });

        $("#nextStepButton").click(function() {
            GuiManager.simulateNextStep();
        });

        $("#start-fast-game").click(function() {
            GuiManager.switchMode("fastGame");
        });

        $("#start-step-game").click(function() {
            GuiManager.switchMode("stepGame");
        });

        $("#start-statistics").click(function() {
            GuiManager.switchMode("statistics");
        });

        $("#run-statistics").click(function() {
            GuiManager.runStatistics();
        });
    });
});
