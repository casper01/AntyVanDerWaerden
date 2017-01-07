class DynamicDiv {
    private static idSuffix = "color-div-";
    private readonly id : string;
    private number : number;

    public constructor(number : number) {
        this.number = number;
        this.id = DynamicDiv.idSuffix + this.number;
    }

    public addToHtml(parentId : string) {
        $("#" + parentId).append('<div id="' + this.id + '" class="num-div"><span>' + this.number + '</span></div>');
    }

    public changeColor(newColor : string) {
        $("#" + this.id).css("background", newColor);
    }

    public changeBorder() {
        $("#" + this.id).css("border", "-5px solid black");
        $("#" + this.id).css("border-radius", "30px");
        $("#" + this.id).css("width", "100px");
        $("#" + this.id).css("height", "100px");
    }
}

export default DynamicDiv;
