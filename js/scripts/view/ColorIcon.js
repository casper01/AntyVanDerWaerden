define(["require", "exports", "./Color"], function (require, exports, Color_1) {
    "use strict";
    class ColorIcon {
        constructor(x, y, w, h, r, g, b) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.color = new Color_1.default(r, g, b);
        }
        draw(ctx) {
            // rectangle
            ctx.fill(this.color.toArray());
            ctx.rect(this.x, this.y, this.w, this.h);
        }
        containsPoint(x, y) {
            if (x < this.x || x > this.x + this.w ||
                y < this.y || y > this.y + this.h) {
                return false;
            }
            return true;
        }
        setColor(r, g, b) {
            this.color = new Color_1.default(r, g, b);
        }
        click() {
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ColorIcon;
});
//# sourceMappingURL=ColorIcon.js.map