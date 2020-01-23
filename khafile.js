let project = new Project('New Project');
project.addAssets('Assets/**');
project.addSources('Sources');

project.addLibrary('/home/jsnadeau/foundsdk/hscript');
project.addLibrary('/home/jsnadeau/foundsdk/haxeui-core');
project.addLibrary('/home/jsnadeau/foundsdk/haxeui-kha');
// project.addLibrary('/home/jsnadeau/foundsdk/haxeui-code-editor');
// project.addLibrary('/home/jsnadeau/foundsdk/haxeui-kha-extended');
resolve(project);
