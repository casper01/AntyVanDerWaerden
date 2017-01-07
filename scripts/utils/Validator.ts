class Validator {
    public static validate_nkc(n, k, c) : any {
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

    public static validate_test(tests) {
        if (isNaN(tests) || tests <= 0) {
            return "Please verify tests number";
        }
        return true;
    }
}

export default Validator;
