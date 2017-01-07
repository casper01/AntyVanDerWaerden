define(["require", "exports"], function (require, exports) {
    "use strict";
    class DynamicDiv {
        constructor(number) {
            this.number = number;
            this.id = DynamicDiv.idSuffix + this.number;
        }
        addToHtml(parentId) {
            $("#" + parentId).append('<div id="' + this.id + '" class="num-div"><span>' + this.number + '</span></div>');
        }
        changeColor(newColor) {
            $("#" + this.id).css("background", newColor);
        }
        changeBorder() {
            $("#" + this.id).css("border", "-5px solid black");
            $("#" + this.id).css("border-radius", "30px");
            $("#" + this.id).css("width", "100px");
            $("#" + this.id).css("height", "100px");
        }
    }
    DynamicDiv.idSuffix = "color-div-";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = DynamicDiv;
});
//# sourceMappingURL=DynamicDiv.js.map