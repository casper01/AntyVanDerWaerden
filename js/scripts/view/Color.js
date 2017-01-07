define(["require", "exports"], function (require, exports) {
    "use strict";
    class Color {
        constructor(r, g, b) {
            this.r = r;
            this.g = g;
            this.b = b;
        }
        toArray() {
            return [this.r, this.g, this.b];
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Color;
});
//# sourceMappingURL=Color.js.map