define(["require", "exports", "./scripts/view/GuiManager"], function (require, exports, GuiManager_1) {
    "use strict";
    require([], () => {
        $(document).ready(function () {
            GuiManager_1.default.init();
            $("#startButton").click(function () {
                GuiManager_1.default.startVisualGame();
            });
            $("#startByStepButton").click(function () {
                GuiManager_1.default.startStepByStepGame();
            });
            $("#nextStepButton").click(function () {
                GuiManager_1.default.simulateNextStep();
            });
            $("#start-fast-game").click(function () {
                GuiManager_1.default.switchMode("fastGame");
            });
            $("#start-step-game").click(function () {
                GuiManager_1.default.switchMode("stepGame");
            });
            $("#start-statistics").click(function () {
                GuiManager_1.default.switchMode("statistics");
            });
            $("#run-statistics").click(function () {
                GuiManager_1.default.runStatistics();
            });
        });
    });
});
//# sourceMappingURL=config.js.map