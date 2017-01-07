define(["require", "exports"], function (require, exports) {
    "use strict";
    class Timer {
        start() {
            if (this.started)
                throw new Error("Timer alredy started");
            this.from = performance.now();
            this.started = true;
        }
        stop() {
            if (!this.started)
                throw new Error("Timer not started");
            this.to = performance.now();
            this.started = false;
        }
        elapsedSeconds() {
            return (this.to - this.from) / 1000;
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Timer;
});
//# sourceMappingURL=Timer.js.map