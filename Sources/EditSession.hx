package;

@:native('ace.EditSession')
extern class EditSession {
    public function new():Void;
    public function setMode(mode:String):Void;
    public function setValue(text:String):Void;
}