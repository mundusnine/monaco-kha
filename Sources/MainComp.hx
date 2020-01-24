package;

import haxe.ui.core.Component;
import haxe.ui.containers.Box;
import js.Browser.document;

@:build(haxe.ui.macros.ComponentMacros.build("../Assets/main.xml"))
class MainComp extends Box {
    public function new() {
        super();
        percentWidth = 100;
        percentHeight = 100;
        this.test.addComponent(new CodeEditor());
    }
}