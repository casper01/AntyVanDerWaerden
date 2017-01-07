class Move {
    private _number: number;
    private _color: number;

    constructor(number: number, color: number) {
        this._number = number;
        this._color = color;
    }

    public equals(move: Move): boolean {
        return this._color == move._color && this._number == move._number;
    }

    sameColor(color: number): boolean {
        return this._color == color;
    }

    get number(): number {
        return this._number;
    }

    get color(): number {
        return this._color;
    }

}

export default Move