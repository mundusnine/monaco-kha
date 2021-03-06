package;

import kha.Assets;
import kha.Color;
import kha.Framebuffer;
import kha.Scheduler;
import kha.System;
import haxe.ui.core.Screen;
import haxe.ui.Toolkit;

class Main {
	static var logo = ["1 1 1 1 111", "11  111 111", "1 1 1 1 1 1"];

	static function update(): Void {
	}

	static function render(frames: Array<Framebuffer>): Void {
		
		final fb = frames[0];
		final g2 = fb.g2;
		g2.begin();
		haxe.ui.core.Screen.instance.renderTo(g2);
		g2.end();
	}

	public static function main() {
		System.start({title: "Project", width: 1024, height: 768}, function (_) {
			// Just loading everything is ok for small projects
			Assets.loadEverything(function () {
				Scheduler.addTimeTask(function () { update(); }, 0, 1 / 60);
				System.notifyOnFrames(function (frames) { render(frames); });
				Toolkit.init();
				Screen.instance.addComponent(new MainComp());
			});
		});
	}
}
