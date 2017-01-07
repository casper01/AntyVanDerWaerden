class Timer {
    private from : number;
    private to : number;
    private started : boolean;

    public start() {
        if (this.started)
            throw new Error("Timer alredy started");
        this.from = performance.now();
        this.started = true;
    }

    public stop() { 
        if (!this.started)
            throw new Error("Timer not started");
        this.to = performance.now();
        this.started = false;
    }

    public elapsedSeconds() {
        return (this.to - this.from) / 1000;
    }
}

export default Timer;