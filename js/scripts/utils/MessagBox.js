define(["require", "exports"], function (require, exports) {
    "use strict";
    class MessageBox {
        constructor() { }
        static show(text, title = "Error!") {
            $("#message-box").dialog("option", "title", title);
            $("#message-box").text(text);
            $("#message-box").dialog("open");
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = MessageBox;
});
//# sourceMappingURL=MessagBox.js.map