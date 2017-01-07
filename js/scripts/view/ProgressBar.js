define(["require", "exports"], function (require, exports) {
    "use strict";
    class ProgressBar {
        constructor() { }
        static set(val) {
            if (val < 0) {
                val = 0;
            }
            else if (val > 100) {
                val = 100;
            }
            ProgressBar.instance.progressbar({ value: val });
        }
        static get() {
            return ProgressBar.instance.progressbar("value");
        }
    }
    ProgressBar.instance = $("#progressbar");
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ProgressBar;
});
//# sourceMappingURL=ProgressBar.js.map