class Color {
    public r : number;
    public g : number;
    public b : number;

    public constructor(r : number, g : number, b : number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    public toArray() {
        return [this.r, this.g, this.b];
    }
}

export default Color;
