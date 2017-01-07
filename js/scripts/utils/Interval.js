define(["require", "exports"], function (require, exports) {
    "use strict";
    class Interval {
        static setInterval(fun, timeout) {
            if (Interval.timer == undefined) {
                Interval.timer = setInterval(fun, timeout);
            }
            else {
                Interval.clearInterval();
                Interval.setInterval(fun, timeout);
            }
        }
        static clearInterval() {
            if (Interval.timer != undefined) {
                clearInterval(Interval.timer);
            }
            Interval.timer = undefined;
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Interval;
});
//# sourceMappingURL=Interval.js.map