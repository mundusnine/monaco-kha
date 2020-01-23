package;
#if js
import haxe.ui.core.Component;
import js.html.DivElement;
import js.Browser.document;
import haxe.ui.Toolkit;

class CodeEditor extends Component {
    
    private var element:DivElement = null;
    private var editor:Editor;
    private var code:String = "package;\n\n
    @:native('ace.Editor')\n
    extern class Editor {\n
        public function new();\n
        public var session:EditSession;\n
        public function setTheme(theme:String):Void;\n
    }";
    public function new(){
        super();
        
        element = document.createDivElement();
        element.id = "editor";
        element.style.cssText = "position:absolute;";
        document.body.appendChild(element);
        var ace = document.createScriptElement();
        ace.src = "ace.js";
        ace.type = "text/javascript";
        ace.onload = done;
        document.body.appendChild(ace);
    }
    private function done(){
        // for(f in Reflect.fields( Ace)){
        //     trace(f);
        // }
        // trace(Ace);
        editor = Ace.edit('editor');
        editor.getSession().setValue(code);
        // new Document(['Hello','World']);
        editor.setTheme('monokai');
        editor.setTheme('monokai');
        // editor.getSession().setMode("haxe");
    }
    public override function ready() {
        super.ready();
        // _el = Browser.document.getElementById(htmlId);
        // var instance = document.createScriptElement();
        // instance.innerText = "var editor = ace.edit('editor');\neditor.setTheme('src-min-noconflict/theme-monokai.js');\neditor.session.setMode('src-min-noconflict/mode-html.js');";
        // document.body.appendChild(instance);
        element.style.display = null;
        Toolkit.callLater(function() { // something not quite right here, shouldnt need a 1 frame delay
            syncElementBounds();
        });
    }
    
    public override function onResized() {
        syncElementBounds();
        if(editor != null)
            editor.resize();
    }
    
    public override function onMoved() {
        syncElementBounds();
    }

    public var offsetX:Float = 0; // location of the canvas on the html page
    public var offsetY:Float = 0;
    private function syncElementBounds() {
        if (element == null) {
            trace("no element");
            return;
        }
        
        element.style.left = (offsetX + screenLeft) + "px";
        element.style.top = (offsetY + screenTop) + "px";
        element.style.width = width + "px";
        element.style.height = height + "px";
    }
    
}
#end