class ColorGenerator {
    private count : number;

    public constructor(count : number) {
        this.count = count;
    }

    public generate() : string[] {
        let step = 360 / this.count;
        let colorList : string[] = [];
        for (var i=1; i<=this.count; i++) {
            colorList.push("hsl(" + (i*step) + ", 100%, 50%)");
        }
        return colorList;
    }
}

export default ColorGenerator;
