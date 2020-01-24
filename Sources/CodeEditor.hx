package;
#if js
import haxe.ui.Toolkit;
import haxe.ui.core.Component;
import haxe.ui.core.InteractiveComponent;
import haxe.ui.events.UIEvent;

import js.html.DivElement;
import js.Browser.document;

import monaco.Monaco;
import monaco.Editor;
import monaco.Languages;
import monaco.LanguageParser;
import monaco.Require;

class CodeEditor extends InteractiveComponent {
    
    private var element:DivElement = null;
    private var editor:IStandaloneCodeEditor;
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
        element.classList.add('code-editor');
        document.body.appendChild(element);
        var monaco = document.createScriptElement();
        monaco.src = "vs/loader.js";
        monaco.type = "text/javascript";
        monaco.onload = function(){
            Require.require(['vs/editor/editor.main'], done);
        };
        document.body.appendChild(monaco);
    }
    private function done(){
        language = "haxe";
        addLanguage(_language);
        editor = Monaco.editor.create(element, {
            renderLineHighlight: "none",
            language: _language,
			automaticLayout : true,
			wordWrap : true,
			minimap : { enabled : false },
			theme : "vs-dark",
            fontSize: 12
        });
        text = code;
        editor.getModel().updateOptions({ insertSpaces:false, trimAutoWhitespace:true });
        editor.addCommand(monaco.KeyCode.KEY_S | monaco.KeyMod.CtrlCmd, function() { clearSpaces(); onSave(); });
        element.onclick = function(e:Any){
            trace("was clicked");
            focus = true;
        };

        editor.getModel().onDidChangeContent(function(e) {
            dispatch(new UIEvent(UIEvent.CHANGE));
        });
        editor.onDidChangeCursorPosition(function(e) {
            dispatch(new UIEvent(UIEvent.CHANGE));
        });
        // invalidateComponent();

    }
    function clearSpaces() {
		var code = code;
		var newCode = [for( l in StringTools.trim(code).split("\n") ) StringTools.rtrim(l)].join("\n");
		if( newCode != code ) {
			var p = editor.getPosition();
			text = newCode;
			editor.setPosition(p);
		}
	}
    public override function ready() {
        super.ready();
        // _el = Browser.document.getElementById(htmlId);
        // var instance = document.createScriptElement();
        // instance.innerText = "var editor = ace.edit('editor');\neditor.setTheme('src-min-noconflict/theme-monokai.js');\neditor.session.setMode('src-min-noconflict/mode-html.js');";
        // document.body.appendChild(instance);
        // element.style.display = null;
        Toolkit.callLater(function() { // something not quite right here, shouldnt need a 1 frame delay
            syncElementBounds();
        });
    }
    
    public override function onResized() {
        syncElementBounds();
    }
    
    public override function onMoved() {
        syncElementBounds();
    }

    public var offsetX:Float = 8; // location of the canvas on the html page
    public var offsetY:Float = 8;
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

    private var _text:String;
    // public var text(get,set):String;
    private override function get_text():String {
        if (editor != null) {
            return editor.getValue();
        }
        return _text;
    }
    private override function set_text(value:String):String {
        super.set_text(value);
        _text = value;
        _text = StringTools.replace(_text, "\\n", "\n");
        _text = StringTools.replace(_text, "\\t", "    ");
        if (editor != null) {
            editor.setValue(_text);
        }
        return value;
    }

    private var _language:String;
    public var language(get, set):String;
    private function get_language() {
        return _language;
    }
    private function set_language(value:String):String {
        _language = value;
        if (editor != null) {
            addLanguage(value);
            Monaco.editor.setModelLanguage(editor.getModel(), _language);
        }
        return value;
    }
    
    private function addLanguage(id) {
        if (hasLanguage(id) == false) {
            var lang = LanguageParser.get(id);
            if (lang != null) {
                Monaco.languages.register( { id: id } );
                Monaco.languages.setMonarchTokensProvider(id, lang);
            }
        }
    }
    public function hasLanguage(id:String):Bool {
        for (l in Monaco.languages.getLanguages()) {
            if (l.id == id) {
                return true;
            }
        }
        return false;
    }
    
    public override function validateComponentLayout():Bool {
        var b = super.validateComponentLayout();
        if (this.width > 0 && this.height > 0 && editor != null) {
            var usableSize = this.layout.usableSize;
            editor.layout({
               width: usableSize.width,
               height: usableSize.height
            });
        }
        return b;
    }

    private override function set_focus(value:Bool):Bool {
        _focus = value;
        if (editor != null && _focus == true) {
            Toolkit.callLater(function() {
                editor.focus();
            });
        }
        return value;
    }
    
    public var caretPosition(get, set):Position;
    private function get_caretPosition():Position {
        var modelPos = editor.getPosition();
        return new Position(modelPos.lineNumber, modelPos.column);
    }
    private function set_caretPosition(value:Position):Position {
        trace("was called");
        editor.setPosition({
            readonly: false,
            lineNumber: value.lineNumber,
            column: value.column
        }); 
        return value;
    }
}
#end