define(["require", "exports"], function (require, exports) {
    "use strict";
    class Validator {
        static validate_nkc(n, k, c) {
            if (isNaN(n) || isNaN(k) || isNaN(c)) {
                return "Input data must be numbers!";
            }
            if (n <= 0 || k <= 0 || c <= 0) {
                return "Input data must greater than 0!";
            }
            if (k > c) {
                return "Input data must meet condition k <= c";
            }
            if (k > n) {
                return "Input data must meet condition k <= n";
            }
            if (c > n) {
                return "Input data must meet condition c <= n";
            }
            return true;
        }
        static validate_test(tests) {
            if (isNaN(tests) || tests <= 0) {
                return "Please verify tests number";
            }
            return true;
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Validator;
});
//# sourceMappingURL=Validator.js.map