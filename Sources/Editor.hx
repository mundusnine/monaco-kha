package;

@:native("ace.Editor")
extern class Editor {
    public function new();
    // public var session:EditSession;
    public function resize(force:Bool=true):Void;
    public function getSession():EditSession;
    public function setTheme(theme:String):Void;
}