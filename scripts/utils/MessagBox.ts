class MessageBox {
    private constructor() {}

    public static show(text : string, title : string = "Error!") {
        $("#message-box").dialog("option", "title", title);
        $("#message-box").text(text);
        $("#message-box").dialog("open");
    }
}

export default MessageBox;
