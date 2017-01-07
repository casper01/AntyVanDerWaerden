define(["require", "exports"], function (require, exports) {
    "use strict";
    class ColorGenerator {
        constructor(count) {
            this.count = count;
        }
        generate() {
            let step = 360 / this.count;
            let colorList = [];
            for (var i = 1; i <= this.count; i++) {
                colorList.push("hsl(" + (i * step) + ", 100%, 50%)");
            }
            return colorList;
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ColorGenerator;
});
//# sourceMappingURL=ColorGenerator.js.map