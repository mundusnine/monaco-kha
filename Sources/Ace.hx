package;

typedef TextMode = {
    var mode:String;
    var selectionStyle:String;
}

@:native('ace')
extern class Ace {
    public static function createEditSession(text:Document,mode:TextMode):Document;
    public static function edit(el:String):Editor;
}