class Interval {
    private static timer : any;

    public static setInterval(fun : any, timeout : number) {
        if (Interval.timer == undefined) {
            Interval.timer = setInterval(fun, timeout);
        }
        else {
            Interval.clearInterval();
            Interval.setInterval(fun, timeout);
        }
    }

    public static clearInterval() {
        if (Interval.timer != undefined) {
            clearInterval(Interval.timer);
        }
        Interval.timer = undefined;
    }
}

export default Interval;
