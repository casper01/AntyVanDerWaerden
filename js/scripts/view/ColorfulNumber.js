define(["require", "exports", "./ColorIcon"], function (require, exports, ColorIcon_1) {
    "use strict";
    class ColorfulNumber extends ColorIcon_1.default {
        constructor(x, y, w, h, r, g, b, content) {
            super(x, y, w, h, r, g, b);
            this.fontSize = 30;
            this.content = content;
        }
        draw(ctx) {
            super.draw(ctx);
            // text
            ctx.fill(0);
            ctx.textSize(this.fontSize);
            ctx.textAlign(ctx.CENTER, ctx.CENTER);
            let centerX = this.x + this.w / 2;
            let centerY = this.y + this.h / 2;
            ctx.text(this.content, centerX, centerY);
        }
        click() {
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ColorfulNumber;
});
//# sourceMappingURL=ColorfulNumber.js.map