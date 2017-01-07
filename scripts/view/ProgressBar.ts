class ProgressBar {
    private static instance = $("#progressbar");

    public constructor() {}

    public static set(val : number) {
        if (val < 0) {
            val = 0;
        }
        else if (val > 100) {
            val = 100;
        }
        ProgressBar.instance.progressbar({ value: val });
    }

    public static get() : number {
        return ProgressBar.instance.progressbar("value");
    }
}

export default ProgressBar;